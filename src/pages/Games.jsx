import { useState, useEffect } from "react";
import CancelButton from "../components/Buttons/CancelButton";
import CubeLayout from "../components/CubeLayout";
import GameSelectionsView from "../components/GamesPageComponents/GameSelectionsView";
import GameSnippet from "../components/GamesPageComponents/GameSnippet";
import { getPicturePath } from "/electron/utils/assets.js";

function Games() {
    const [marioSrc, setMarioSrc] = useState("");

    useEffect(() => {
        getPicturePath("mario.png").then(setMarioSrc);
    }, []);

    return (
        <CubeLayout width="800px" height="800px">
            <GameSelectionsView nextGame="Super Mario World" currentGame="Super Mario 64" prevGame="Super Smash Bros"/>
            {marioSrc && <GameSnippet src={marioSrc} />}
            <CancelButton x="600px" y="600px" dst="/" />
        </CubeLayout>
    )
}

export default Games