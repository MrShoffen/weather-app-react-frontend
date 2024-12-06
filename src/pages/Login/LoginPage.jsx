import Header from "../../components/Header/Header.jsx";
import SignIn from "../../components/SignIn/SignIn.tsx";
import './Login.css'


export default function LoginPage() {
    return (
        <>
            <Header/>
            <div className="loginBox">
                <SignIn/>
            </div>
        </>
    )
}