import { useNavigate } from 'react-router-dom';
import CancelButtonStyle from "/src/styles/CancelButton.module.css";
import { preload, play } from "/electron/utils/sound";
import { on, off, BUTTONS } from '/electron/utils/gamepad';
import { useEffect, useState } from 'react';

preload("click");
preload("hover");

interface CancelButtonProps {
    dst: string;
    x?: string;
    y?: string;
}

// x and y are accepted as props but not forwarded to DOM (not valid HTML button attributes)
function CancelButton({ dst }: CancelButtonProps) {
    const navigate = useNavigate();
    const [pressed, setPressed] = useState(false);
    const [pressedInput, setPressedInput] = useState(false);

    useEffect(() => {
        const handleB = () => {
            play("click");
            setPressed(true);
            setTimeout(() => {
                setPressed(false);
                setPressedInput(true);
                setTimeout(() => {
                    setPressedInput(false);
                    navigate(dst);
                }, 100);
            }, 100);
        };

        on(BUTTONS.B, handleB);

        return () => {
            off(BUTTONS.B, handleB);
        };
    }, [dst, navigate]);

    const getClassName = () => {
        if (pressed) {
            return `${CancelButtonStyle.container} ${CancelButtonStyle.pressed}`;
        } else if (pressedInput) {
            return `${CancelButtonStyle.container} ${CancelButtonStyle.pressedInput}`;
        }
        return CancelButtonStyle.container;
    };

    return (
        <button
            className={getClassName()}
            onMouseOver={() => {
                play("hover");
            }}
            onClick={() => {
                play("click");
                navigate(dst);
            }}>
            Cancel (B)
        </button>
    );
}

export default CancelButton;
