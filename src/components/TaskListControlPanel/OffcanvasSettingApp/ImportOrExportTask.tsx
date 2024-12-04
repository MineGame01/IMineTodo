import React, { useState } from "react";
import { Button } from "../../Button";
import { Input } from "../../Forms/Input";
import exportFromJSON from "export-from-json";
import { getTaskListLocalStorage, setTaskListLocalStorage } from "../../../utils/taskListLocalStorage";
import { importTaskList } from "../../../store/slices/TodosAppSlice";
import { useAppDispatch } from "../../../hooks/storeHooks";
import { ITask } from "../../../store/slices/TodosAppSlice/types";

interface IImportOrExportFormFields extends HTMLFormControlsCollection {
    jsonInput: HTMLInputElement,
}

interface IImportOrExportFormElements extends HTMLFormElement {
    readonly elements: IImportOrExportFormFields
}

export const ImportOrExportTask = () => {
    const [status, setStatus] = useState<string | null>(null);
    const dispatch = useAppDispatch();

    const handleExport = () => {
        const taskList = getTaskListLocalStorage();
        const fileName = "IMineTodo: TaskListData";
        
        exportFromJSON({ data: taskList, fileName, exportType: "json" });
    }

    const handleImport = (event: React.FormEvent<IImportOrExportFormElements>) => {
        event.preventDefault();
        const jsonInput = event.currentTarget.elements.jsonInput;
        const jsonFile = jsonInput.files ? jsonInput.files[0] : null;

        if (jsonFile) {
            const reader = new FileReader();

            reader.onload = function(e) {
                const result = e.target?.result;
                try {
                    if (typeof result === "string") {
                        setTaskListLocalStorage(JSON.parse(result) as ITask[]);
                        dispatch(importTaskList({ importTaskList: JSON.parse(result) as ITask[] | [] }))
                        setStatus("Done!");
                        setTimeout(() => {
                            setStatus(null);
                        }, 5000);
                    }
                } catch (err) {
                    setStatus("Error Import!");
                    console.error("Error Import!", err);
                }
            }

            reader.readAsText(jsonFile);
        }
    }

    return <section>
        <h5>Import and Export TaskList</h5>
        <Button 
        classNameStyle="btn-default w-100"
        onClick={handleExport}>Export JSON</Button>
        <form onSubmit={handleImport} className="mt-1">
            <Input name="jsonInput" id="import-or-export-task-json-input" type="file" accept="application/json" />
            <Button 
            type="submit"
            classNameStyle="btn-default w-100 mt-1">Import JSON</Button>
        </form>
        {status && <div>{status}</div>}
    </section>
}