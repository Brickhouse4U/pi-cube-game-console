import style from "/src/styles/CustomSlider.module.css"

function CustomSlider(props) {
    return (
        <div>
            <label class={style.containerLabel} >{props.title}</label>
            <input 
                type="range" 
                min={props.min} 
                max={props.max} 
                value={props.value} 
                onChange={props.onChange}
                class={style.containerSlider} 
            />
        </div>
    )
}

export default CustomSlider