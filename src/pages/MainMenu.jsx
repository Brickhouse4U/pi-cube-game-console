import CubeLayout from "../components/CubeLayout";
import MenuOption from "../components/Buttons/MenuOption";
import CubeLayoutStyle from "/src/styles/CubeLayout.module.css";
import { Link } from 'react-router-dom'; // ← ADD THIS


function MainMenu() {
    return (
        <CubeLayout width="640px" height="640px">
            <h1>Pi Cube</h1>
            <div className={CubeLayoutStyle.container}>
                <MenuOption dst="/games" text="Games" />
                <MenuOption dst="/options" text="Options" />
            </div>
        </CubeLayout>
    )
}

export default MainMenu