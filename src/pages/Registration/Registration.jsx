import Header from "../../components/Header/Header.jsx";
import './Registration.css'
import SignUpForm from "../../components/SignUp/SignUpForm.tsx";


export default function Registration() {
    return (
        <>
            <Header/>
            <div className="loginBox">
                <SignUpForm/>
            </div>
        </>
    )
}