import React, { useEffect, useState } from "react";
import { TaskListControlPanel } from "../../components/TaskListControlPanel";
import { TaskList } from "../../components/TaskList";
import { EditorTaskPage } from "../EditorTaskPage";
import { SearchForm } from "../../components/SearchForm";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { selectTaskList, selectEditingTask } from "../../store/slices/TodosAppSlice";
import { setTaskListLocalStorage } from "../../utils/taskListLocalStorage";
import { isMobile } from "react-device-detect";
import { ButtonAddTask } from "./ButtonAddTask";
import { ITask, TIdTask } from "../../store/slices/TodosAppSlice/types";
import { selectIdAuthUser, updateAccessToken } from "../../store/slices/AuthSlice";
import { Subscription } from "@supabase/supabase-js";
import { supabase } from "../../supabase";

export const TaskAppPage: React.FC = () => {
    const [isSearchTaskMode, setIsSearchTaskMode] = useState(false);
    const [isSelectedTask, setIsSelectedTask] = useState(false);
    const [searchTaskList, setSearchTaskList] = useState<ITask[]>([]);
    const [selectsTask, setSelectsTask] = useState<string[]>([]);

    const taskList = useAppSelector(selectTaskList);
    const editingTask = useAppSelector(selectEditingTask);
    const authUserId = useAppSelector(selectIdAuthUser);
    const lastEditTask = useAppSelector(state => state.root.todosApp.lastEditTaskList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        let subscription: Subscription;
        if (authUserId) {
            const { data } = supabase.auth.onAuthStateChange((_event, session) => {
                subscription = data.subscription;
                dispatch(updateAccessToken({ accessToken: session?.access_token ?? null }));
            });
        }
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (subscription) {
                subscription.unsubscribe();
            }
        }
    }, [authUserId, dispatch]);

    if (lastEditTask) {
        setTaskListLocalStorage(taskList);
    }

    const isDesktop = !isMobile;

    const handleSearchTask = (e: React.FormEvent, value: string) => {
        e.preventDefault();
        searchTask(value);
    }

    const setIsSearchTaskModeFn = (value: boolean) => {
        if (!value) setSearchTaskList([]);
        setIsSearchTaskMode(value);
    }

    const selectTask = (idTask: TIdTask) => {
        if (selectsTask.includes(idTask)) {
            setSelectsTask(selectsTask.filter(id => id !== idTask));
        } else {
            setSelectsTask([ ...selectsTask, idTask ]);
        }
    }

    const searchTask = (value: string) => {
        setSearchTaskList([]);
        if (value.length > 0) {
            taskList.forEach((task) => {
                if (task.content.title.toLowerCase().includes(value.toLowerCase())) {
                    setSearchTaskList(prevSearchTaskList => [ task, ...prevSearchTaskList ]);
                } else setSearchTaskList(prevSearchTaskList => [ ...prevSearchTaskList, task ]);
            });
        }
    }

    if (editingTask && isMobile) {
        return <EditorTaskPage />
    }

    // Home
    return <div className={`${isDesktop ? "row gx-0" : ""} h-100`}>
        <div className="col">
            {!isSearchTaskMode ? 
            <TaskListControlPanel 
            isSelectedTask={isSelectedTask} 
            selectsTask={selectsTask}
            setSelectsTask={setSelectsTask}
            setIsSelectedTask={setIsSelectedTask} /> : null}
            <SearchForm
            onSubmit={handleSearchTask}
            isSearchTaskMode={isSearchTaskMode}
            setIsSearchTaskMode={setIsSearchTaskModeFn} />
            <TaskList 
            isSearchTaskMode={isSearchTaskMode} 
            searchTaskList={searchTaskList}
            isSelectedTask={isSelectedTask}
            selectsTask={selectsTask}
            selectTask={selectTask} />
            {!isSearchTaskMode ? 
                <div
                className="position-fixed bottom-0 end-0 m-3" 
                style={{ transform: "translate(-20px, -20px)"}}>
                    <ButtonAddTask />
                </div> : null
            }
        </div>
        {isDesktop && <div className="col-9"><EditorTaskPage key={editingTask?.id} /></div>}
    </div>
}