import CancelButton from "../components/Buttons/CancelButton";
import CubeLayout from "../components/CubeLayout";
import GameSelectionsView from "../components/GamesPageComponents/GameSelectionsView";
import GameSnippet from "../components/GamesPageComponents/GameSnippet"


function Games() {
    return (
    <CubeLayout width="800px" height="800px">
            <GameSelectionsView nextGame="Super Mario World" currentGame="Super Mario 64" prevGame="Super Smash Bros"/>
            <GameSnippet src="electron/public/assets/pictures/mario.png" />
            <CancelButton x="600px" y="600px" dst="/" />
    </CubeLayout>
    )
}

export default Games