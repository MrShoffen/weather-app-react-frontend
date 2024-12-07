import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from "./pages/Home/HomePage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import {CustomThemeContext} from "./context/CustomTheme/CustomThemeContext.jsx";
import PageNotFound from "./pages/Error/ErrorPage.jsx";
import RegistrationPage from "./pages/Registration/RegistrationPage.jsx";


function App() {
    return (
        <CustomThemeContext>
            <BrowserRouter>

                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/registration" element={<RegistrationPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/*" element={<PageNotFound status={404} description={'Page Not Found!'}/>}/>
                </Routes>

            </BrowserRouter>
        </CustomThemeContext>
    )
}

export default App
