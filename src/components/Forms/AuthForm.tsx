import React, { useRef, useState } from "react";
import { Input } from "./Input";
import { nanoid } from "@reduxjs/toolkit";

interface IAuthFormControls extends HTMLFormControlsCollection {
    authFormEmail: HTMLInputElement,
    authFormPassword: HTMLInputElement,
}

export interface IAuthFormElement extends HTMLFormElement {
    readonly elements: IAuthFormControls,
}

interface IAuthFormProps {
    errors?: {
        authFormEmail?: string | null,
        authFormPassword?: string | null
        global?: string | null
    },
    children?: React.ReactNode,
    onSubmit: (e: React.FormEvent<IAuthFormElement>, email: string, password: string) => void,
}

export const AuthForm: React.FC<IAuthFormProps> = ({
    onSubmit,
    errors,
    children
}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const ID_FORM_REF = useRef(nanoid());
    
    const ID_EMAIL_INPUT = `auth-form-email-${ID_FORM_REF.current}`;
    const ID_PASSWORD_INPUT = `auth-form-password-${ID_FORM_REF.current}`;

    const handleSubmit: React.FormEventHandler<IAuthFormElement> = (e) => {
        e.preventDefault();

        onSubmit(e, email, password);
    }

    const ErrorText = (props: { error: string }) => {
        return <div className="text-center text-danger">{props.error}</div>
    }

    return <form onSubmit={handleSubmit}>
        <label htmlFor={ID_EMAIL_INPUT}>Email: </label>
        <Input 
        name="authFormEmail"
        type="email"
        id={ID_EMAIL_INPUT}
        value={email}
        onChange={(e) => {
            setEmail(e.target.value);
        }}
        required />
        {errors?.authFormEmail && <ErrorText error={errors.authFormEmail} />}
        <label htmlFor={ID_PASSWORD_INPUT}>Password: </label>
        <Input 
        name="authFormPassword"
        type="password"
        id={ID_PASSWORD_INPUT}
        value={password}
        onChange={(e) => {
            setPassword(e.target.value);
        }}
        required />
        {errors?.authFormPassword && <ErrorText error={errors.authFormPassword} />}
        {children}
        {errors?.global && <ErrorText error={errors.global} />}
    </form>
}