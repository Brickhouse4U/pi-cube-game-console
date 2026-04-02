import style from '/src/styles/GameSnippet.module.css'

function GameSnippet(props) {
    return (
        <img src={props.src} alt="Game Image" className={style.gameSnippetContainer} />
    )
}

export default GameSnippet