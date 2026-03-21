import { useNavigate } from 'react-router-dom'
import CancelButtonStyle from "/src/styles/CancelButton.module.css"

function CancelButton(props) {
    const navigate = useNavigate()

    return (
        <button className={CancelButtonStyle.container} x={props.x} y={props.y} onClick={() => navigate(props.dst)}>
            Cancel
        </button>
    )
}

export default CancelButton