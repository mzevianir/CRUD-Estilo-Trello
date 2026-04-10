import styles from "./styles.module.css"
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import avatar from "../../assets/avatar.jpg"

export function Profile() {
    return (
        <div className={styles.identificator}>
            <div className={styles.profile}>
                <div className={styles.avatar}>
                    <img src={avatar} alt="Avatar" />
                </div>
                <span>Aang</span>
            </div>
            <button className={styles.btn}>
                <Link to="/login" className={styles.link}>
                    <span className={styles.span}>
                        <MdLogout />
                        Sair
                    </span>
                </Link>
            </button>
        </div>
    )
}