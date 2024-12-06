import Header from "../../components/Header/Header.jsx";
import SignInForm from "../../components/SignIn/SignInForm.tsx";
import './Login.css'


export default function LoginPage() {
    return (
        <>
            <Header/>
            <div className="loginBox">
                <SignInForm/>
            </div>
        </>
    )
}