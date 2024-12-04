import React, { useEffect, useRef, useState } from "react";
import StyleCSS from "./index.module.scss";
import { AuthForm, IAuthFormElement } from "../../components/Forms/AuthForm";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { selectIdAuthUser, authorizationThunk, checkAuthSessionThunk } from "../../store/slices/AuthSlice";
import { TaskAppPage } from "../TaskAppPage";
import { TNumberBoolean } from "../../store/slices/SettingAppSlice";
import { getPreview } from "../../utils/previewLocalStorage";
import LogoAppSVG from "./../../assets/Logo.svg";
import { Button } from "../../components/Button";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export const AuthPage: React.FC = () => {
    const [preview, setIsPreview] = useState<TNumberBoolean>(getPreview());
    const [formAuthType, setFormAuthType] = useState<"auth" | "reg">("auth");

    const [captchaToken, setCaptchaToken] = useState("");
    const captcha = useRef<HCaptcha | null>(null);

    const idAuthUser = useAppSelector(selectIdAuthUser);
    const authError = useAppSelector(state => state.root.auth.error);
    const authStatus = useAppSelector(state => state.root.auth.status);
    const dispatch = useAppDispatch();

    if (preview === 1) {
        setTimeout(() => {
            setIsPreview(0);
        }, 1500);
    }

    useEffect(() => {
        void dispatch(checkAuthSessionThunk());
    }, [dispatch]);

    const resetCaptcha = () => {
        if (captcha.current) {
            captcha.current.resetCaptcha();
        }
    }
    
    const handleRegister = (_e: React.FormEvent<IAuthFormElement>, email: string, password: string) => {
        void dispatch(authorizationThunk({
            email,
            password,
            captchaToken,
            reg: true,
        }));
        resetCaptcha();
    }

    const handleAuth = (_e: React.FormEvent<IAuthFormElement>, email: string, password: string) => {
        void dispatch(authorizationThunk({
            email,
            password,
            captchaToken
        }));
        resetCaptcha();
    }

    // const handleAuthAnonymous = async () => {
    //     setAuthStatus("pending");

    //     const { data, error } = await supabase.auth.signInAnonymously({
    //         options: { captchaToken }
    //     });

    //     if (data && !error) {
    //         dispatch(setAuthAnonymous(true));
    //         if (captcha.current) {
    //             captcha.current.resetCaptcha();
    //         }
    //         setAuthStatus("completed");
    //     } else if (error) {
    //         console.error(error);
    //         setAuthErrorAuthClear(error.message);
    //         setAuthStatus("reject");
    //     }
    // }

    // Preview
    if (preview) {
        return <main className={`${StyleCSS.preview} ${StyleCSS.previewBgAnimation}`}>
            <h1 className={`${StyleCSS.previewTextAnimation} ${StyleCSS.previewText}`}>
                <img src={LogoAppSVG} alt="LogoApp" />
                IMineTodo
            </h1>
        </main>
    }
        
    if (idAuthUser) {
        return <TaskAppPage />
    }

    const SpinnerAuthStatus = () => {
        return <>
            {authStatus === "pending" && <div className="spinner-border spinner-border-sm me-2" role="status"></div>}
        </>
    }

    return <main>
        <h1 className={`${StyleCSS.previewTextAnimation} ${StyleCSS.previewText} text-center mt-5`}>
            <img src={LogoAppSVG} alt="LogoApp" />
            IMineTodo
        </h1>
        <article className="container">
            <section>
                <h3>{formAuthType === "auth" ? "Authorization" : "Registration"}</h3>
                <AuthForm 
                onSubmit={formAuthType === "auth" ? handleAuth : handleRegister} 
                errors={{ global: authError }}>
                    <Button 
                    classNameStyle="btn-default w-100 mt-1"
                    disabled={authStatus === "pending"}
                    type="submit">
                        <SpinnerAuthStatus />
                        <span>{formAuthType === "auth" ? "Login" : "Create"}</span>
                    </Button>
                    <div className="text-center mt-1">
                        <HCaptcha
                        ref={captcha}
                        sitekey="75cc2de6-caca-4d10-a722-aae6cdf228e0"
                        onVerify={(token) => {
                            setCaptchaToken(token)
                        }}/>
                    </div>
                </AuthForm>
                <div className="text-center mt-1">
                    <Button
                    onClick={() => { setFormAuthType(formAuthType === "auth" ? "reg" : "auth") }}>
                        {formAuthType === "auth" ? "Don't have an account?" : "Do you have an account?"}
                    </Button>
                </div>
            </section>
        </article>
        {/* <Button classNameStyle="btn-default" onClick={handleAuthAnonymous}>Anonymous</Button> */}
    </main>
}