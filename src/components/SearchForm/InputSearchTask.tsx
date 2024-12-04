import React, { forwardRef } from "react";
import { Input } from "../Forms/Input";

interface IInputSearchTask {
    searchValue: string,
    onChangeSearch: React.ChangeEventHandler,
    isSearchTaskMode: boolean,
    setSearchMode: (value: boolean) => void,
}

export const InputSearchTask = forwardRef<HTMLInputElement, IInputSearchTask>(({
    searchValue,
    onChangeSearch,
    isSearchTaskMode,
    setSearchMode
}, ref) => {
    return <Input
        name="search-task"
        value={searchValue}
        onChange={onChangeSearch}
        type="text" 
        classNameStyle="ps-5"
        placeholder="Search Task"
        ref={ref}
        onFocus={() => { if (!isSearchTaskMode) setSearchMode(true) }}
        onBlur={() => {
            if (isSearchTaskMode && searchValue.length === 0) setSearchMode(false)
        }}/>
});