import CubeLayout from "../components/CubeLayout";
import CustomSlider from "../components/CustomSlider";
import CancelButton from "../components/CancelButton";
import OptionsStyle from "../styles/Options.module.css"

import { useState, useEffect, useMemo } from "react";
import { debounce } from "lodash";

function Options() {
    const [brightness, setBrightnessState] = useState(1.0);
    const [volume, setVolume] = useState(10);

    useEffect(() => {
        window.brightness.get().then(setBrightnessState);
    }, []);

    const debouncedSet = useMemo(() =>
        debounce((value) => window.brightness.set(value), 100)
    , []);

    useEffect(() => {
        return () => debouncedSet.cancel();
    }, [debouncedSet]);

    const handleChange = (e) => {
        const value = parseFloat(e.target.value);
        setBrightnessState(value);
        debouncedSet(value);
    };

    return (

        <CubeLayout width="640px" height="640px">
            <div className={OptionsStyle.container} width="320px" height="320px">
                <CustomSlider 
                    title="Brightness: " 
                    min="0.1" 
                    max="1.0" 
                    step="0.1" 
                    value={brightness} 
                    onChange={handleChange}/>

                <CustomSlider 
                    title="Volume:     " 
                    min="0" 
                    max="10" 
                    step="1" 
                    value={volume} 
                    onChange={(e) => setVolume(e.target.value)}/>
            </div>
            <CancelButton x="480px" y="480px" dst="/" />
        </CubeLayout>
    )
}

export default Options