import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ProfilePage from "./pages/Profile/ProfilePage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import {CustomThemeContext} from "./context/CustomTheme/CustomThemeContext.jsx";
import PageNotFound from "./pages/Error/ErrorPage.jsx";
import RegistrationPage from "./pages/Registration/RegistrationPage.jsx";
import {AuthProvider} from "./context/Auth/AuthContext.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import ProtectedRoute from "./context/Auth/ProtectedRoute.jsx";
import LoadingPage from "./pages/Loading/LoadingPage.jsx";


function App() {
    return (
        <AuthProvider>
            <CustomThemeContext>
                <BrowserRouter>

                    <Routes>
                        <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/loading" element={<LoadingPage/>}/>
                        <Route path="/registration" element={<RegistrationPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/*" element={<PageNotFound status={404} description={'Page Not Found!'}/>}/>
                    </Routes>

                </BrowserRouter>
            </CustomThemeContext>
        </AuthProvider>
    )
}

export default App
