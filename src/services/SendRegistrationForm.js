import {API_REGISTRATION} from "../UrlConstants.jsx";


export const sendRegistrationForm = async (registrationData) =>{
    try {
        const response = await fetch(API_REGISTRATION , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(registrationData),
        });

        if (!response.ok) {
            console.log(response);
            throw new Error('RegistrationPage failed');
        }
        console.log(response.headers);

        console.log(response)
        console.log(response.headers.get("location"));

        // const data = await response.json();
        // console.log('RegistrationPage successful:', data);
        // alert('RegistrationPage successful!');


    } catch (error) {
        console.error('Error during registration:', error);
        alert('Error: ' + error.message);
    }
}