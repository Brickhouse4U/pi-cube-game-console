import CubeLayout from "../components/CubeLayout";
import MenuOption from "../components/Buttons/MenuOption";
import CubeLayoutStyle from "/src/styles/CubeLayout.module.css";
import { start, stop, on, off, BUTTONS } from '/electron/utils/gamepad';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const MENU_ITEMS = [
    { text: "Games", dst: "/games" },
    { text: "Options", dst: "/options" },
];

function MainMenu() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [pressedIndex, setPressedIndex] = useState(null);
    const selectedIndexRef = useRef(0);
    const navigate = useNavigate();

    useEffect(() => {
        start();

        const handleUp = () => {
            const next = Math.max(0, selectedIndexRef.current - 1);
            selectedIndexRef.current = next;
            setSelectedIndex(next);
        }

        const handleDown = () => {
            const next = Math.min(MENU_ITEMS.length - 1, selectedIndexRef.current + 1);
            selectedIndexRef.current = next;
            setSelectedIndex(next);
        }

        const handleA = () => {
            setPressedIndex(selectedIndexRef.current);
            setTimeout(() => {
                navigate(MENU_ITEMS[selectedIndexRef.current].dst);
            }, 150);
        }

        on(BUTTONS.A, handleA);
        on(BUTTONS.DPAD_UP, handleUp);
        on(BUTTONS.DPAD_DOWN, handleDown);
    }, []);

    return (
        <CubeLayout width="640px" height="640px">
            <h1>Pi Cube</h1>
            <div className={CubeLayoutStyle.container}>
                {MENU_ITEMS.map((item, index) => (
                    <MenuOption 
                        key={item.dst} 
                        dst={item.dst} 
                        text={item.text} 
                        selected={index === selectedIndex}
                        pressed={index === pressedIndex}
                    />
                ))}
            </div>
        </CubeLayout>
    )
}

export default MainMenu;