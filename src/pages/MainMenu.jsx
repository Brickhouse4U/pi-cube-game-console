import CubeLayout from "../components/CubeLayout";
import style from "/src/styles/CubeLayout.module.css";


function MainMenu() {
    return (
        <CubeLayout width="640px" height="640px">
            <h1>Pi Cube</h1>
            <div className={style.container}>
                <span className={style.label}>Games</span>
                <span className={style.label}>Options</span>
                <span className={style.label}>Calender</span>
                <span className={style.label}>Storage</span>
            </div>
        </CubeLayout>
    )
}

export default MainMenu