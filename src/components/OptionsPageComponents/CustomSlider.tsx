import React from 'react';
import style from "/src/styles/CustomSlider.module.css";
import selectedStyle from "/src/styles/SelectedSlider.module.css";
import { play } from "/electron/utils/sound";

interface CustomSliderProps {
    selected: boolean;
    title: string;
    value: number;
    min: number | string;
    max: number | string;
    step: number | string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function CustomSlider({ selected, title, value, min, max, step, onChange }: CustomSliderProps) {
    console.log('selected:', selected, 'class:', selected ? 'selectedStyle' : 'baseStyle');
    const percent = Math.round(parseFloat(String(value)) * 100) + "%";

    return (
        <div className={style.sliderRow}>
            <label className={style.containerLabelAlt}>
                {title}
            </label>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onMouseOver={() => play("hover")}
                onChange={(e) => {
                    onChange(e);
                    play('rollover');
                }}
                className={selected ? selectedStyle.containerSlider : style.containerSlider}
            />
            <span className={style.percentLabel}>
                {percent}
            </span>
        </div>
    );
}

export default CustomSlider;
