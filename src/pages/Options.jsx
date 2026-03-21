import CubeLayout from "../components/CubeLayout";
import CustomSlider from "../components/CustomSlider";
import CancelButton from "../components/CancelButton";
import OptionsStyle from "../styles/Options.module.css"

import { useState } from "react";

function Options() {
    const [brightness, setBrightness] = useState(10);

    return (

        <CubeLayout width="640px" height="640px">
            <div className={OptionsStyle.container} width="320px" height="320px">
                <CustomSlider title="Brightness: " min="0" max="10" value={brightness} onChange={(e) => setBrightness(e.target.value)}/>
                <CustomSlider title="Volume:     " min="0" max="10" value="10"/>
            </div>
            <CancelButton x="480px" y="480px" dst="/" />
        </CubeLayout>
    )
}

export default Options