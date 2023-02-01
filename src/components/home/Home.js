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
import ProfileForm from "../forms/ProfileForm";
import { useNavigate, Link } from 'react-router-dom';
import { useGlobalContext } from "../../contexts/GlobalContext";
import AudioPlayer from "react-audio-player";
import Game from "../game/Game";

import "./Home.css";
import { Button } from "react-bootstrap";

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

    const handleZoomGame = () => {
        setZoom(true);
        // setButtonClicked("play")
        setTimeout(() => {
            navigate("/game");
        }, 700);
    };

    const handleZoomGamePvp = () => {
        setZoom(true);
        setButtonClicked("playpvp")
        setTimeout(() => {
            navigate("/gamePvP");
        }, 700);
    };

    const handleLogin = () => {
        return (
            <>
                <LogInForm setButtonClicked={setButtonClicked} />
                <AudioPlayer src="https://cdn.pixabay.com/download/audio/2022/09/29/audio_a4b3f2fe44.mp3?filename=select-sound-121244.mp3" autoPlay />
            </>
        );
    };
    const handleLogout = () => {
        console.log('logout');
        return (
            <>
                <h1 className="logout-confirmation">Logout</h1>
                <button className="button-yes" onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    setToken(false)
                    setUserId(false)
                    setButtonClicked(false)
                }}>Yes</button>
                <button className="button-no" onClick={() => {
                    setButtonClicked(false)
                }}>No</button>
                <AudioPlayer src="https://cdn.pixabay.com/download/audio/2022/09/29/audio_a4b3f2fe44.mp3?filename=select-sound-121244.mp3" autoPlay />
            </>
        );
    };
    const handleSignUp = () => {
        return (
            <>
                <SignUpForm setButtonClicked={setButtonClicked} />
                <AudioPlayer src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_23b7958390.mp3?filename=menu-click-89198.mp3" autoPlay />
            </>
        );
    };

    const handleInfo = () => {
        return (
            <>
                <ProfileForm />
                <AudioPlayer src="https://cdn.pixabay.com/download/audio/2022/01/18/audio_a29a673ef4.mp3?filename=decidemp3-14575.mp3" autoPlay />
            </>
        );
    };

    return (
        <div className="container">
            {<AudioPlayer src="https://cdn.pixabay.com/download/audio/2022/02/07/audio_f11b3b3cc6.mp3?filename=cottagecore-17463.mp3" autoPlay loop />}
            {buttonClicked === "play" && <AudioPlayer src="https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=correct-2-46134.mp3" autoPlay />}
            {buttonClicked === "playpvp" && <AudioPlayer src="https://cdn.pixabay.com/download/audio/2022/01/18/audio_ee9ac692c2.mp3?filename=scale-e6-14577.mp3" autoPlay />}
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
                        {buttonClicked === "logout" && handleLogout()}
                        {buttonClicked === "signup" && handleSignUp()}
                        {buttonClicked === "info" && handleInfo()}
                        {!zoom &&
                            buttonClicked !== "login" &&
                            buttonClicked !== "logout" &&
                            buttonClicked !== "signup" &&
                            buttonClicked !== "info" && (
                                token ?
                                    <div>
                                        <button onClick={handleZoomGame} className="button-play">PLAY</button>
                                        <button onClick={handleZoomGamePvp} className="button-play-pvp">PLAY PVP</button>
                                    </div>
                                    :
                                    <div>
                                        <button onClick={() => setButtonClicked("login")}>LOGIN</button>
                                    </div>
                            )}
                        {!zoom &&
                            buttonClicked !== "login" &&
                            buttonClicked !== "logout" &&
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
                            title="Sign up"
                        />
                    </button>
                    <button
                        className="button button-b"
                        onClick={() => {
                            {
                                !token ?
                                    setButtonClicked("login")
                                    :
                                    setButtonClicked("logout")
                            }
                        }}
                    >
                        {token ?
                            <FontAwesomeIcon
                                icon={faUser}
                                className="icon-signup"
                                title="Log out"
                            />
                            :
                            <FontAwesomeIcon
                                icon={faUser}
                                className="icon-signup"
                                title="Log in"
                            />
                        }
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