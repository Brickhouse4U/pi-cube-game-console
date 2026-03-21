import CubeLayout from "../components/CubeLayout";
import CubeLayoutStyle from "/src/styles/CubeLayout.module.css";
import { Link } from 'react-router-dom'; // ← ADD THIS


function MainMenu() {
    return (
        <CubeLayout width="640px" height="640px">
            <h1>Pi Cube</h1>
            <div className={CubeLayoutStyle.container}>
                <Link to="/games" className={CubeLayoutStyle.label}>Games</Link>
                <Link to="/options" className={CubeLayoutStyle.label}>Options</Link>
            </div>
        </CubeLayout>
    )
}

export default MainMenu