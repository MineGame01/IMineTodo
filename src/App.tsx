import { ThemeProvider } from "./providers/ThemeProvider";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { IconContext } from "react-icons";
import { ICON_DEFAULT_SIZE } from "./components/Icons";
import { AuthPage } from "./pages/AuthPage";

export const App = () => {
    return <ThemeProvider>
        <Provider store={store}>
            <IconContext.Provider value={{ size: ICON_DEFAULT_SIZE }}>
                <AuthPage />
            </IconContext.Provider>
        </Provider>
    </ThemeProvider>
}