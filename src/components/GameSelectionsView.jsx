import { useState } from "react"
import GameSelectionsViewStyle from "/src/styles/GameSelectionsView.module.css"
import UpButton from "./UpButton"
import DownButton from "./DownButton"

function GameSelectionsView(gameTitles) {
    return (
            <div className={GameSelectionsViewStyle.container}>
                <UpButton />
                <span className={GameSelectionsViewStyle.prevText}>{gameTitles.prevGame}</span>
                <span className={GameSelectionsViewStyle.currentText} >{gameTitles.currentGame}</span>
                <span className={GameSelectionsViewStyle.nextText} >{gameTitles.nextGame}</span>
                <DownButton />
            </div>
    )
}

export default GameSelectionsView