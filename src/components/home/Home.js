import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faInfoCircle,
    faSignInAlt,
    faShip,
} from "@fortawesome/free-solid-svg-icons";
import "./Home.css";
import SignUpForm from "../forms/SignUpForm";
import LogInForm from "../forms/LogInForm";
import { useNavigate, Link } from 'react-router-dom';
import { useGlobalContext } from "../../contexts/GlobalContext";
export default function Home() {
    const navigate = useNavigate();

    const {
        showSignUpModal,
        showLogInModal,
        setShowSignUpModal,
        setShowLogInModal,
        token,
        setToken,
        userId,
        setUserId
    } = useGlobalContext();

    // useEffect(()=>{

    // })

    const [zoom, setZoom] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const handleZoom = () => {
        setZoom(true);
        setTimeout(() => {
            // window.location.href = "/game";

            navigate("/game");
        }, 500);
    };
    const handleLogin = () => {
        return (
            <div className="screen-display">
                <LogInForm />
            </div>
        );
    };
    const handleSignUp = () => {
        return (
            <div className="screen-display">
                <SignUpForm />
            </div>
        );
    };
    const handleInfo = () => {
        return (
            <div className="screen-display">
                <h1>INFO</h1>
                {/* component info */}
            </div>
        );
    };
    return (
        <div className="container">
            {console.log("game")}
            <div className={`arcade-machine ${zoom ? "zoom" : ""}`}>
                <div className="shadow"></div>
                <div className="top">
                    <h1 className="title">BATTLE SHIP</h1>
                </div>
                <div className="screen-container">
                    <div className="shadow"></div>
                    <div className="screen">
                        <div className="screen-display"></div>
                        {buttonClicked === "login" && handleLogin()}
                        {buttonClicked === "signup" && handleSignUp()}
                        {buttonClicked === "info" && handleInfo()}
                        {!zoom &&
                            buttonClicked !== "login" &&
                            buttonClicked !== "signup" &&
                            buttonClicked !== "info" && (
                                // ADD button to play music
                                <button onClick={handleZoom}>PLAY</button>
                            )}
                        {!zoom &&
                            buttonClicked !== "login" &&
                            buttonClicked !== "signup" &&
                            buttonClicked !== "info" && (
                                <div className="ship-container">
                                    <div className="ship">
                                        <FontAwesomeIcon
                                            icon={faShip}
                                            className="icon-ship"
                                        />
                                    </div>
                                </div>
                            )}
                    </div>{" "}
                    <div className="joystick">
                        <div className="stick"></div>
                    </div>
                </div>
                <div className="board">
                    <button
                        className="button button-a"
                        onClick={() => {
                            setButtonClicked("signup");
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faSignInAlt}
                            className="icon-login"
                            title="Login"
                        />
                    </button>
                    <button
                        className="button button-b"
                        onClick={() => {
                            setButtonClicked("login");
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faUser}
                            className="icon-signup"
                            title="Sign Up"
                        />
                    </button>
                    <button
                        className="button button-c"
                        onClick={() => {
                            setButtonClicked("info");
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faInfoCircle}
                            className="icon-info"
                            title="Info"
                        />
                    </button>
                </div>
                <div className="bottom">
                    <div className="stripes"></div>
                </div>
                <audio src="../audios/music.mp3" autoPlay loop></audio>
            </div>
        </div>
    );
}