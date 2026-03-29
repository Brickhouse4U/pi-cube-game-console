import style from "/src/styles/CustomSlider.module.css"

function CustomSlider(props) {
    return (
        <div>
            <label className={style.containerLabel} >{props.title}</label>
            <input 
                type="range" 
                min={props.min} 
                max={props.max} 
                step={props.step}
                value={props.value} 
                onChange={props.onChange}
                className={style.containerSlider} 
            />
        </div>
    )
}

export default CustomSlider