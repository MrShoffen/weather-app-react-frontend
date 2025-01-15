import {CSSTransition} from "react-transition-group";
import './FadeAnimation.css'
import React from "react";

export default function AnimatedElement({children, condition}) {

    const nodeRef = React.useRef(null)
    return (
        <CSSTransition
            nodeRef={nodeRef}
            in={condition}
            timeout={300}
            classNames="fade"
            unmountOnExit
        >

                {children}

        </CSSTransition>
    )
}