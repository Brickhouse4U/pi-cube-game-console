import React from 'react';
import style from '/src/styles/CubeLayout.module.css';

interface CubeLayoutProps {
    width: string;
    height: string;
    children: React.ReactNode;
}

function CubeLayout({ width, height, children }: CubeLayoutProps) {
    return (
        <div style={{ width, height }} className={style.layout}>
            {children}
        </div>
    );
}

export default CubeLayout;
