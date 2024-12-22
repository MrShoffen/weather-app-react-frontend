import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ProfilePage from "./pages/Profile/ProfilePage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import {CustomThemeContext} from "./context/CustomTheme/CustomThemeContext.jsx";
import PageNotFound from "./pages/Error/ErrorPage.jsx";
import RegistrationPage from "./pages/Registration/RegistrationPage.jsx";
import {AuthProvider} from "./context/Auth/AuthContext.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import AvailableAfterLoginRoute from "./context/Auth/AvailableAfterLoginRoute.jsx";
import LoadingPage from "./pages/Loading/LoadingPage.jsx";
import Layout from "./pages/Layout/Layout.jsx";
import UnavailableAfterLoginRoute from "./context/Auth/UnavailableAfterLoginRoute.jsx";


function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <CustomThemeContext>


                    <Routes>
                        <Route path="weather-app" element={<Layout/>}>
                            <Route index element={<HomePage/>}/>
                            <Route path="*" element={<PageNotFound status={404} description={'Page Not Found!'}/>}/>
                            <Route path="loading" element={<LoadingPage/>}/>

                            <Route path="login"
                                   element={<UnavailableAfterLoginRoute><LoginPage/></UnavailableAfterLoginRoute>}/>
                            <Route path="registration" element={
                                <UnavailableAfterLoginRoute><RegistrationPage/></UnavailableAfterLoginRoute>}/>
                            <Route path="profile"
                                   element={<AvailableAfterLoginRoute><ProfilePage/></AvailableAfterLoginRoute>}/>
                        </Route>
                    </Routes>


                </CustomThemeContext>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
