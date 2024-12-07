import {API_NEW_MATCH} from "../UrlConstants.jsx";


export const sendRegistrationForm = async (registrationData) =>{
    try {
        const response = await fetch(API_NEW_MATCH , {
            method: 'POST',

            body: JSON.stringify(registrationData),
        });

        if (!response.ok) {
            throw new Error('RegistrationPage failed');
        }

        const data = await response.json();
        console.log('RegistrationPage successful:', data);
        alert('RegistrationPage successful!');
    } catch (error) {
        console.error('Error during registration:', error);
        alert('Error: ' + error.message);
    }
}