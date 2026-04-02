import CubeLayoutStyle from "/src/styles/CubeLayout.module.css";
import { Link } from 'react-router-dom'; // ← ADD THIS
import { preload, play } from "/electron/utils/sound.js";

preload("click", "/electron/public/assets/sounds/click.ogg");
preload("hover", "/electron/public/assets/sounds/hover.ogg");

function MenuOption(props) {
    return (
        <Link 
            to={props.dst} 
            className={CubeLayoutStyle.label} 
            onMouseOver={() => {
                play("hover");
            }}
            onClick={() => { 
                play("click");
            }}>
            {props.text}
        </Link>
    )
}

export default MenuOption