import Header from "../../components/Header/Header.jsx";
import './Registration.css'
import SignUpForm from "../../components/SignUp/SignUpForm.jsx";


export default function RegistrationPage() {
    return (
        <>
            <Header/>
            <div className="loginBox">
                <SignUpForm/>
            </div>
        </>
    )
}