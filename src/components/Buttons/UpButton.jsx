import { useState, useEffect } from "react";
import UpButtonStyle from "/src/styles/UpButton.module.css"
import { preload, play } from "/electron/utils/sound.js";
import { getPicturePath } from "/electron/utils/assets.js";

function UpButton() {
    const [src, setSrc] = useState("");

    useEffect(() => {
        preload("click");
        preload("hover");
        getPicturePath("wide_v_arrow_up.svg").then(setSrc);
    }, []);

    return (
        <button 
            className={UpButtonStyle.container}
            onMouseOver={() => play("hover")}
            onClick={() => play("click")}
        >
            {src && <img src={src} />}
        </button>
    )
}

export default UpButton