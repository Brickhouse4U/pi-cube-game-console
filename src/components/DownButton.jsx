import DownButtonStyle from "/src/styles/DownButton.module.css"

function DownButton() {

    return (
        <button className={DownButtonStyle.container}>
            <img src="/src/resources/wide_v_arrow_down.svg" />
        </button>
    )
}

export default DownButton