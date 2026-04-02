import { useNavigate } from 'react-router-dom'
import CancelButtonStyle from "/src/styles/CancelButton.module.css"
import { preload, play } from "/electron/utils/sound.js";

preload("click", "/electron/public/assets/sounds/click.ogg");
preload("hover", "/electron/public/assets/sounds/hover.ogg");

function CancelButton(props) {
    const navigate = useNavigate()

    return (
        <button 
            className={CancelButtonStyle.container} 
            x={props.x} 
            y={props.y} 
            onMouseOver={() => {
                play("hover");
            }}
            onClick={() => {
                play("click");
                navigate(props.dst);
            }}>
            Cancel
        </button>
    )
}

export default CancelButton