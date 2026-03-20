import style from '/src/styles/CubeLayout.module.css'

function CubeLayout(props) {
    return (
        <div style={{ width: props.width, height: props.height }} className={style.layout}>
            {props.children}
        </div>
    )
}

export default CubeLayout