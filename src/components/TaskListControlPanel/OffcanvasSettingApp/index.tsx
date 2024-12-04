import React from "react";
import { ButtonCloseSettingApp } from "../ButtonCloseSettingApp";
import { ThemeIcons } from "../../ThemeIcons";
import { TChangeTheme, ThemeModeType } from "../../../providers/ThemeProvider";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHooks";
import { setPreview } from "../../../store/slices/SettingAppSlice";
import { ImportOrExportTask } from "./ImportOrExportTask";
import LogoAppSVG from "./../../../assets/Logo.svg";
import { Button } from "../../Button";
import { authSet } from "../../../store/slices/AuthSlice";
import { supabase } from "../../../supabase";

interface IOffcanvasSettingAppProps {
    themeMode: ThemeModeType,
    themeChange: TChangeTheme,
}

export const OffcanvasSettingApp: React.FC<IOffcanvasSettingAppProps> = ({
    themeMode,
    themeChange
}) => {
    const themeMods: ThemeModeType[] = ["auto", "light", "dark"];
    const preview = useAppSelector(state => state.root.settingApp.preview);
    const authUserEmail = useAppSelector(state => state.root.auth.email);
    const dispatch = useAppDispatch();

    const handleExitAccount = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            dispatch(authSet({
                email: null,
                uid: null,
                accessToken: null
            }));
        }
    }

    return <article className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasSettingApp">
        <section className="offcanvas-header">
            <img className="me-1" src={LogoAppSVG} alt="Logo App" width={40} />
            <h5 className="offcanvas-title">Setting</h5>
            <ButtonCloseSettingApp />
        </section>
        <hr />
        <section className="offcanvas-body">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <section>
                        <h5>Preview</h5>
                        <div className="d-flex justify-content-between align-items-center">
                            <span>Show splash screen on boot</span>
                            <input 
                            type="checkbox" 
                            className="switchCheckbox"
                            checked={Boolean(preview)}
                            onChange={() => { dispatch(setPreview(preview === 1 ? 0 : 1)) }} />
                        </div>
                    </section>
                </li>
                <hr />
                <li className="nav-item">
                    <section>
                        <ThemeIcons className="me-1" mode={themeMode} options={{ size: "23" }} />
                        <h5 className="d-inline">Toggle Theme</h5>
                        <form aria-label="Theme Buttons" className="btn-group w-100 mt-1">
                            {themeMods.map((mode, index) => {
                                const indexInput = String(index + 1);
                                
                                return (
                                    <React.Fragment key={mode}>
                                        <input 
                                        type="radio" 
                                        checked={themeMode === mode}
                                        onChange={() => { themeChange(mode) }}
                                        className="btn-check" 
                                        name="themeBtn-radio"
                                        id={"themeBtn-radio-" + indexInput}
                                        autoComplete="off" />
                                        <label 
                                        className={`btn ${themeMode === mode ? "btn-primary" : "btn-default"} d-flex align-items-center justify-content-center`} 
                                        htmlFor={"themeBtn-radio-" + indexInput}>
                                            <ThemeIcons mode={mode} />
                                            <span className="ms-2">{mode[0].toUpperCase() + mode.slice(1)}</span>
                                        </label>
                                    </React.Fragment>
                                )
                            })}
                        </form>
                    </section>
                </li>
                <hr />
                <li className="nav-item">
                    <ImportOrExportTask />
                </li>
                <hr />
                <li>
                    <section>
                        <h5>Account</h5>
                        <p>Email: { authUserEmail ?? "Anonymous" }</p>
                        <Button onClick={() => {
                            void handleExitAccount();
                        }} classNameStyle="btn-danger w-100">Exit</Button>
                    </section>
                </li>
            </ul>
        </section>
    </article>
}