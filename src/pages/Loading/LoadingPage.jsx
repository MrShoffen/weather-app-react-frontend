import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header.jsx";
import './Loading.css'
import {Skeleton} from "@mui/material";

function LoadingPage(children) {

    const windowWidth = window.innerWidth


    return (
        <div style={styles.container}>
            <Skeleton style={styles.skeleton} animation="wave" width={windowWidth * 0.4} height={80}/>
            <Skeleton style={styles.skeleton} animation="wave" width={windowWidth * 0.6}/>
            <Skeleton style={styles.skeleton} animation="wave" width={windowWidth * 0.7}/>
            <Skeleton style={styles.skeleton} animation="wave" width={windowWidth * 0.6}/>
            <Skeleton style={styles.skeleton} animation="wave" width={windowWidth * 0.7}/>
            <Skeleton style={styles.skeleton} animation="wave" width={windowWidth * 0.6}/>
            <Skeleton style={styles.skeleton} animation="wave" width={windowWidth * 0.7}/>

        </div>
    );
}


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column', // Расположить элементы вертикально
        alignItems: 'center', // Выравнивание по горизонтали в центре
        gap: '10px', // Минимальное расстояние между элементами
        marginTop: '80px', // Общий отступ сверху для блока
    },
    skeleton: {
        marginTop: '0', // Мы убираем `marginTop` у отдельных `Skeleton`, так как использовали `gap`
    },
};
export default LoadingPage;