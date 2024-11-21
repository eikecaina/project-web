"use client";

import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import "./Loader.css";
import styled from "@emotion/styled";

// import { Box } from "@mui/material";
// import { styled } from "@mui/material/styles";
const div = (<div></div>)

const BoxLoader = styled.div(() => ({
    width: "100%",
    height: "100%",
    top: "0px",
    left: "0px",
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1400,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
}));

const Loader = forwardRef((props: { visible: boolean }, ref) => {
    const [visible, setVisible] = useState(
        undefined === props.visible ? true : props.visible,
    );
    const [mounted, setMounted] = useState(false);

    useImperativeHandle(ref, () => ({
        setVisible,
    }));

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!!visible && !!mounted) {
        return (
            <BoxLoader className="weg-loading-main-div">
                <div className="weg-loading-spinner">
                    <div className="color color1" />
                    <div className="color color2" />
                    <div className="color color3" />
                    <div className="color color4" />
                </div>
            </BoxLoader>
        );
    }
    return null;
});

Loader.displayName = "Loader";

export default Loader;
