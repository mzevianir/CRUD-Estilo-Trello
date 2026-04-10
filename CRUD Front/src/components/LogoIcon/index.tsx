import type { CSSProperties } from "styled-components";
import styles from "./styles.module.css"
import { LuClipboardList } from "react-icons/lu";

type LogoIconProps = {
    size?: number;
    className?: string;
    style?: CSSProperties;
}

export function LogoIcon({ size = 20, className = "", style }: LogoIconProps) {
    return (
        <div className={`${styles.icon} ${className}`} style={style}>
            <LuClipboardList size={size} className={styles.svg} />
        </div>
    )
}