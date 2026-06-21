import GameSelectionsViewStyle from "/src/styles/GameSelectionsView.module.css";
import UpButton from "../Buttons/UpButton";
import DownButton from "../Buttons/DownButton";

interface GameSelectionsViewProps {
    nextGame: string;
    currentGame: string;
    prevGame: string;
}

function GameSelectionsView({ nextGame, currentGame, prevGame }: GameSelectionsViewProps) {
    return (
        <div className={GameSelectionsViewStyle.container}>
            <UpButton />
            <span className={GameSelectionsViewStyle.prevText}>{prevGame}</span>
            <span className={GameSelectionsViewStyle.currentText}>{currentGame}</span>
            <span className={GameSelectionsViewStyle.nextText}>{nextGame}</span>
            <DownButton />
        </div>
    );
}

export default GameSelectionsView;
