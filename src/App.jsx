import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SavedLocationsPage from "./pages/SavedLocations/SavedLocationsPage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import {CustomThemeContext} from "./context/CustomTheme/CustomThemeContext.jsx";
import PageNotFound from "./pages/Error/ErrorPage.jsx";
import RegistrationPage from "./pages/Registration/RegistrationPage.jsx";
import {AuthProvider} from "./context/Auth/AuthContext.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import AvailableAfterLoginRoute from "./context/Auth/AvailableAfterLoginRoute.jsx";
import Layout from "./pages/Layout/Layout.jsx";
import UnavailableAfterLoginRoute from "./context/Auth/UnavailableAfterLoginRoute.jsx";
import FindLocationPage from "./pages/FindLocationsUnauth/FindLocationPage.jsx";
import {NotificationProvider} from "./context/Notification/NotificationProvider.jsx";


function App() {
    return (
        <BrowserRouter>
            <CustomThemeContext>
                <NotificationProvider>
                    <AuthProvider>
+                        <Routes>
                            <Route path="weather-app" element={<Layout/>}>
                                <Route index element={<HomePage/>}/>
                                <Route path="*" element={<PageNotFound status={404} description={'Page Not Found!'}/>}/>

                                {/*unavailableAfterLoginRoutes*/}
                                <Route path="login"
                                       element={
                                           <UnavailableAfterLoginRoute>
                                               <LoginPage/>
                                           </UnavailableAfterLoginRoute>
                                       }/>

                                <Route path="registration"
                                       element={
                                           <UnavailableAfterLoginRoute>
                                               <RegistrationPage/>
                                           </UnavailableAfterLoginRoute>
                                       }/>

                                <Route path="find"
                                       element={
                                           <UnavailableAfterLoginRoute>
                                               <FindLocationPage/>
                                           </UnavailableAfterLoginRoute>
                                       }/>

                                {/*availableAfterLoginRoutes*/}
                                <Route path="locations"
                                       element={
                                           <AvailableAfterLoginRoute>
                                               <SavedLocationsPage/>
                                           </AvailableAfterLoginRoute>
                                       }/>
                            </Route>
                        </Routes>
                    </AuthProvider>
                </NotificationProvider>
            </CustomThemeContext>
        </BrowserRouter>
    )
}

export default App
