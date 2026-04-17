import style from "/src/styles/CustomSlider.module.css"
import { preload, play } from "/electron/utils/sound.js";


preload("hover");

function CustomSlider(props) {
    const percent = Math.round(parseFloat(props.value) * 100) + "%";
    
    return (
        <div className={style.sliderRow}>
            <label className={style.containerLabel} >{props.title}</label>
            <input 
                type="range" 
                min={props.min} 
                max={props.max} 
                step={props.step}
                value={props.value} 
                onMouseOver={() => play("hover")}
                onChange={(e) => {
                    props.onChange(e);
                    play('rollover');
                }}
                className={style.containerSlider} 
            />
            <span className={style.percentLabel}>{percent}</span>
        </div>
    )
}

export default CustomSlider