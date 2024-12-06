import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import {CustomThemeContext} from "./context/CustomTheme/CustomThemeContext.jsx";
import PageNotFound from "./pages/Error/ErrorPage.jsx";


function App() {
    return (
        <CustomThemeContext>
            <BrowserRouter>

                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/*" element={<PageNotFound status={404} description={'Page Not Found!'}/>}/>
                    </Routes>

            </BrowserRouter>
        </CustomThemeContext>
    )
}

export default App
