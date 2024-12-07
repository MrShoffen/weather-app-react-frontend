import {API_NEW_MATCH} from "../UrlConstants.jsx";


export const sendRegistrationForm = async (registrationData) =>{
    try {
        const response = await fetch(API_NEW_MATCH , {
            method: 'POST',

            body: JSON.stringify(registrationData),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        const data = await response.json();
        console.log('Registration successful:', data);
        alert('Registration successful!');
    } catch (error) {
        console.error('Error during registration:', error);
        alert('Error: ' + error.message);
    }
}