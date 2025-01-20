import {CSSTransition} from "react-transition-group";
import './FadeAnimation.css'
import React from "react";
import Box from "@mui/material/Box";
import {Slide} from "@mui/material";

export default function AnimatedElement({children, condition}) {

    const nodeRef = React.useRef(null)
    return (
        <Slide
            nodeRef={nodeRef}
            in={condition}
            timeout={300}
            direction='right'

            unmountOnExit
            mountOnEnter
        >
            <Box ref={nodeRef}>
                {children}
            </Box>
        </Slide>
    )
}