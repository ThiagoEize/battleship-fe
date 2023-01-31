import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faInfoCircle,
    faSignInAlt,
    faShip,
} from "@fortawesome/free-solid-svg-icons";
import SignUpForm from "../forms/SignUpForm";
import LogInForm from "../forms/LogInForm";
import { useNavigate, Link } from 'react-router-dom';
import { useGlobalContext } from "../../contexts/GlobalContext";
import AudioPlayer from "react-audio-player";

import "./Home.css";

export default function Home() {
    const navigate = useNavigate();
    const [zoom, setZoom] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
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

    const handleZoom = () => {
        setZoom(true);
        setTimeout(() => {
            navigate("/game");
        }, 500);
        // return (
        //     <AudioPlayer src="https://cdn.pixabay.com/download/audio/2021/08/04/audio_dea21d9092.mp3?filename=game-start-6104.mp3" controls autoPlay />
        // );
    };
    const handleLogin = () => {
        return (
            <>
                <LogInForm />
                <AudioPlayer src="https://cdn.pixabay.com/download/audio/2022/09/29/audio_a4b3f2fe44.mp3?filename=select-sound-121244.mp3" autoPlay />
            </>
        );
    };
    const handleSignUp = () => {
        return (
            <>
                <SignUpForm />
                <AudioPlayer src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_23b7958390.mp3?filename=menu-click-89198.mp3" autoPlay />
            </>
        );
    };
    const handleInfo = () => {
        return (
            <div className="screen-display">
                <h1>INFO</h1>
                {/* component info */}
                <AudioPlayer src="https://cdn.pixabay.com/download/audio/2022/01/18/audio_a29a673ef4.mp3?filename=decidemp3-14575.mp3" autoPlay />
            </div>
        );
    };

    return (
        <div className="container">
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