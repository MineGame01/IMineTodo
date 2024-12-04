import React, { useRef, useState } from "react";
import { ButtonSeachTask } from "./ButtonSearchTask";
import { InputSearchTask } from "./InputSearchTask";
import { ButtonClearInput } from "./ButtonClearInput";

interface ISearchFormProps {
    onSubmit: <T extends HTMLElement>(event: React.FormEvent<T>, value: string) => void,
    setIsSearchTaskMode: (value: boolean) => void,
    isSearchTaskMode: boolean,
}

export const SearchForm: React.FC<ISearchFormProps> = ({
    setIsSearchTaskMode,
    onSubmit,
    isSearchTaskMode
}) => {    
    const [searchValue, setSearchValue] = useState("");
    const inputSearchRef = useRef<HTMLInputElement | null>(null);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchValue(e.target.value);
    }

    return <div className="p-1 pre-bg">
        <form 
        className="position-relative d-flex"
        onSubmit={(e) => {
            onSubmit(e, searchValue);
        }}>
            <ButtonSeachTask isSearchTaskMode={isSearchTaskMode} />
            <InputSearchTask 
            ref={inputSearchRef}  
            searchValue={searchValue}
            onChangeSearch={handleChange}
            isSearchTaskMode={isSearchTaskMode}
            setSearchMode={setIsSearchTaskMode}/>
            {isSearchTaskMode && searchValue.length !== 0 ? 
                <ButtonClearInput 
                setSearchValue={setSearchValue} 
                inputSearchRef={inputSearchRef} /> : null 
            }
        </form>
    </div>
}