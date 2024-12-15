import {CSSTransition} from "react-transition-group";
import './FadeAnimation.css'

export default function AnimatedElement({children, condition}) {

    return (
        <CSSTransition
            in={condition}
            timeout={300}
            classNames="fade"
            unmountOnExit
        >
            {children}
        </CSSTransition>
    )
}