import LogedOut from "../logedOut/LogedOut";
import GameInstructions from "../gameInstructions/GameInstructions";
// import SignupModal from "./SignupModal";
import { useEffect, useState } from 'react';

// import Axios from "axios";

// import { NavLink } from "react-router-dom";
const Home = () => {
    // const [showModal, setShowModal] = useState(true);

    return (
        <>
            {/* if not loged */}
            <LogedOut />
            <GameInstructions />

        </>
    );
};

export default Home;