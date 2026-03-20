import CubeLayout from "../components/CubeLayout";
import GameSelectionsView from "../components/GameSelectionsView";
import GameSnippet from "../components/GameSnippet"


function GameOptions() {
    return (
        <CubeLayout width="960px" height="960px">
            <GameSelectionsView></GameSelectionsView>
            <GameSnippet x="" src=""></GameSnippet>
        </CubeLayout>
    )
}

export default GameOptions