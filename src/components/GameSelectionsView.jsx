import { useState } from "react"
import style from '/src/styles/GameSelectionsView.module.css'

function GameSelectionsView(gameTitles) {
    return (
        <div>
            <h2>{gameTitles.nextGame}</h2>
            <h1>{gameTitles.currentGame}</h1>
            <h2>{gameTitles.prevGame}</h2>
        </div>
    )
}

export default GameSelectionsView