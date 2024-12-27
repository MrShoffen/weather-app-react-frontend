import React from 'react';
import Header from "../../components/Header/Header.jsx";
import './Home.css'
import {useThemeContext} from "../../context/CustomTheme/CustomThemeContext.jsx";
import WbSunnyIcon from '@mui/icons-material/WbSunny';

function HomePage() {
    const {isDarkMode} = useThemeContext();
    return (
        <div className="homeContainer" style={{color: isDarkMode ? "#d2d2d2" : "#2c2c2c"}}>
            <h2>About this site</h2>

            <div className="row justify-content-md-center mb-3 ">
                <div className="col-lg-9 themed-grid-col text-center">A simple project for tracking current weather.
                    Inspired
                    by
                    <a href="https://zhukovsd.github.io/java-backend-learning-course/projects/weather-viewer/"> Sergey
                        Zhukov
                        Java Roadmap</a>

                </div>
            </div>
            <WbSunnyIcon style={{color: "orange"}}/>
            <WbSunnyIcon style={{color: "orange"}}/>
            <WbSunnyIcon style={{color: "orange"}}/>


            <div className="row justify-content-md-center mb-6">
                <div className="col-lg-8 themed-grid-col text-center">
                    To register new account - click menu in top right corner and choose "Sign up"
                </div>
            </div>
            <WbSunnyIcon style={{color: "orange"}}/>
            <WbSunnyIcon style={{color: "orange"}}/>
            <WbSunnyIcon style={{color: "orange"}}/>


            <div className="row justify-content-md-center mb-3">
                <div className="col-lg-8 themed-grid-col text-center">
                    To login in your account - click "Sign in" in top right menu
                </div>
            </div>
            <WbSunnyIcon style={{color: "orange"}}/>
            <WbSunnyIcon style={{color: "orange"}}/>
            <WbSunnyIcon style={{color: "orange"}}/>



            <div className="row justify-content-md-center mb-3">
                <div className="col-lg-9 themed-grid-col text-center">
                    <h3>Technologies and resources used in the project</h3>
                    <hr/>
                    <h4>Frontend</h4>

                    React <a
                    href="https://react.dev/learn">Examples</a><br/>
                    Material UI React <a
                    href="https://mui.com/material-ui/getting-started/">Library</a><br/>


                    <h4>Backend</h4>
                    Java 21 Core<br/>
                    Gradle<br/>
                    Spring Boot (Data JPA, Validation, Web and Test starters)<br/>


                </div>
            </div>

        </div>

    );
}

export default HomePage;