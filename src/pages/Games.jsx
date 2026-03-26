import CancelButton from "../components/CancelButton";
import CubeLayout from "../components/CubeLayout";
import GameSelectionsView from "../components/GameSelectionsView";
import GameSnippet from "../components/GameSnippet"
import CubeLayoutStyle from "/src/styles/CubeLayout.module.css";
import GameSnippetStyle from "/src/styles/GameSnippet.module.css";


function Games() {
    return (
    <CubeLayout width="800px" height="800px">
            <GameSelectionsView nextGame="Super Mario World" currentGame="Super Mario 64" prevGame="Super Smash Bros"/>
            <GameSnippet src="src/resources/mario.png" />
            <CancelButton x="600px" y="600px" dst="/" />
    </CubeLayout>
    )
}

export default Games