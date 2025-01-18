import React from 'react';
import './Home.css'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function HomePage() {
    return (

            <Container disableGutters className="cont" style={{

            }}>

                <Typography sx={{fontSize: 28, fontWeight: 500, mb: 2}}>About This Site</Typography>


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
                        You can use this app without registration - click Search button in top right corner.
                    </div>
                </div>
                <WbSunnyIcon style={{color: "orange"}}/>
                <WbSunnyIcon style={{color: "orange"}}/>
                <WbSunnyIcon style={{color: "orange"}}/>

                <div className="row justify-content-md-center mb-6">
                    <div className="col-lg-8 themed-grid-col text-center">
                        Without registration you can only watch weather of different locations, but you can't save
                        location.
                    </div>
                </div>
                <WbSunnyIcon style={{color: "orange"}}/>
                <WbSunnyIcon style={{color: "orange"}}/>
                <WbSunnyIcon style={{color: "orange"}}/>

                <hr style={{marginTop: 20, marginBottom: 20, marginRight: 50, marginLeft: 50}}/>


                <div className="row justify-content-md-center mb-6">
                    <div className="col-lg-8 themed-grid-col text-center">
                        With registration you can save and delete any locations in your account.
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
                    <div className="col-lg-8 themed-grid-col text-center">
                        After signing in you can edit your profile - change name or avatar. Also you can delete your account or change your password in security settings.
                    </div>
                </div>
                <WbSunnyIcon style={{color: "orange"}}/>
                <WbSunnyIcon style={{color: "orange"}}/>
                <WbSunnyIcon style={{color: "orange"}}/>

                <hr style={{margin: 15}}/>


                <div className="row justify-content-md-center mb-3">
                    <div className="col-lg-9 themed-grid-col text-center">
                        <h3>Technologies and resources used in the project</h3>

                        <h4>Frontend</h4>

                        React <a
                        href="https://react.dev/learn">Examples</a><br/>
                        Material UI React <a
                        href="https://mui.com/material-ui/getting-started/">Library</a><br/>
                        Nginx server<br/>

                        <hr style={{marginRight: 50, marginLeft: 50}}/><br/>


                        <h4>Backend</h4>
                        Java 21 Core<br/>
                        Gradle<br/>
                        Spring Boot (Data JPA, Validation, Web and Test starters)<br/>
                        Liquibase<br/>
                        PostgreSQL Database<br/>
                        Docker and Docker Compose

                    </div>
                </div>

            </Container>


    );
}

export default HomePage;