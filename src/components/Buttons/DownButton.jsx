import { useState, useEffect } from "react";
import DownButtonStyle from "/src/styles/DownButton.module.css"
import { preload, play } from "/electron/utils/sound.js";
import { getPicturePath } from "/electron/utils/assets.js";


function DownButton() {
    const [src, setSrc] = useState("");

    useEffect(() => {
        preload("click");
        preload("hover");
        getPicturePath("wide_v_arrow_down.svg").then(setSrc);
    }, []);

    return (
        <button 
            className={DownButtonStyle.container}
            onMouseOver={() => play("hover")}
            onClick={() => play("click")}
        >
            {src && <img src={src} />}
        </button>
    )
}

export default DownButton