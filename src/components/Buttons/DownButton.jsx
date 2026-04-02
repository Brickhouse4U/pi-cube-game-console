import DownButtonStyle from "/src/styles/DownButton.module.css"
import { preload, play } from "/electron/utils/sound.js";

preload("click", "/electron/public/assets/sounds/click.ogg");
preload("hover", "/electron/public/assets/sounds/hover.ogg");

function DownButton() {

    return (
        <button 
            className={DownButtonStyle.container} 
            onMouseOver={() => play("hover")}
            onClick={() => play("click")}
        >
            <img src="electron/public/assets/pictures/wide_v_arrow_down.svg" />
        </button>
    )
}

export default DownButton