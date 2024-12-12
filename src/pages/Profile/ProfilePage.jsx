import React from 'react';
import Header from "../../components/Header/Header.jsx";
import './Profile.css'

function ProfilePage() {
    return (
        <>
            <Header/>

            <div className="homeContainer">
                <h2>Профиль</h2>
                {/* Здесь можно разместить содержимое для домашней страницы */}
            </div>
        </>
    );
}

export default ProfilePage;