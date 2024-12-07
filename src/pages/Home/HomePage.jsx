import React from 'react';
import Header from "../../components/Header/Header.jsx";
import './Home.css'

function HomePage() {
    return (
        <>
            <Header/>

            <div className="homeContainer">
                <h2>Домашняя страница</h2>
                {/* Здесь можно разместить содержимое для домашней страницы */}
            </div>
        </>
    );
}

export default HomePage;