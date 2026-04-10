import styles from "./styles.module.css"
import { LogoIcon } from "../LogoIcon"

export function Logo({ size = 20, className = "", iconClassName = "" }) {
    return (
        <div className={`${styles.logo} ${className}`}>
            <LogoIcon size={size} className={iconClassName} />
            <span className={styles.h1}>TaskBoard</span>
        </div>
    )
}