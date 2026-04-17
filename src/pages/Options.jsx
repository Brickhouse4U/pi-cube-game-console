import CubeLayout from "../components/CubeLayout";
import CustomSlider from "../components/OptionsPageComponents/CustomSlider";
import CancelButton from "../components/Buttons/CancelButton";
import OptionsStyle from "../styles/Options.module.css";
import { preload } from "/electron/utils/sound";

import { useState, useEffect, useMemo } from "react";
import { debounce } from "lodash";

function Options() {
    const [brightness, setBrightnessState] = useState(1.0);
    const [volume, setVolumeState] = useState(1.0);

    useEffect(() => {
        // Preload sounds
        preload("rollover");

        window.brightness.get().then(setBrightnessState);
        window.volume.get().then(setVolumeState);
    }, []);


    // Debounced brightness setter
    const debouncedSetBrightness = useMemo(() =>
        debounce((value) => window.brightness.set(value), 100)
    , []);

    // Debounced volume setter
    const debouncedSetVolume = useMemo(() =>
        debounce((value) => window.volume.set(value), 100)
    , []);
    
    // Cleanup debounces on unmount
    useEffect(() => {
        return () => {
            debouncedSetBrightness.cancel();
            debouncedSetVolume.cancel();
        };
    }, [debouncedSetBrightness, debouncedSetVolume]);

    const handleBrightnessChange = (e) => {
        const value = parseFloat(e.target.value);
        setBrightnessState(value);
        debouncedSetBrightness(value);
    };

    const handleVolumeChange = (e) => {
        const value = parseFloat(e.target.value);
        setVolumeState(value);
        debouncedSetVolume(value);
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
                    onChange={handleBrightnessChange}/>

                <CustomSlider 
                    title="Volume:" 
                    min="0.0" 
                    max="1.0" 
                    step="0.1" 
                    value={volume} 
                    onChange={handleVolumeChange}/>
            </div>
            <CancelButton x="480px" y="480px" dst="/" />
        </CubeLayout>
    )
}

export default Options