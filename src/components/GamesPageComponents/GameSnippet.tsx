import style from '/src/styles/GameSnippet.module.css';

interface GameSnippetProps {
    src: string;
}

function GameSnippet({ src }: GameSnippetProps) {
    const videoSrc = src.startsWith('file://') ? src : `file://${src}`;

    return (
        <div className={style.gameSnippetContainer}>
            <video
                src={videoSrc}
                autoPlay
                loop
                muted
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        </div>
    );
}

export default GameSnippet;
