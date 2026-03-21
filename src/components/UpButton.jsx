import UpButtonStyle from "/src/styles/UpButton.module.css"

function UpButton() {

    return (
        <button className={UpButtonStyle.container}>
            <img src="/src/resources/wide_v_arrow_up.svg" />
        </button>
    )
}

export default UpButton