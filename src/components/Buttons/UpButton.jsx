import UpButtonStyle from "/src/styles/UpButton.module.css"
import { preload, play } from "/electron/utils/sound.js";

preload("click", "/electron/public/assets/sounds/click.ogg");
preload("hover", "/electron/public/assets/sounds/hover.ogg");

function UpButton() {

    return (
        <button 
            className={UpButtonStyle.container } 
            onMouseOver={() => play("hover")}
            onClick={() => play("click")}
        >
            <img src="electron/public/assets/pictures/wide_v_arrow_up.svg" />
        </button>
    )
}

export default UpButton