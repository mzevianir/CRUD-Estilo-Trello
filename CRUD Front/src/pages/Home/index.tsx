import styles from "./style.module.css"
import { Logo } from "../../components/Logo"
import { MdLogout } from "react-icons/md";
import { Link, Navigate } from "react-router-dom";
import avatar from "../../assets/avatar.jpg";
import { TbLayoutGrid } from "react-icons/tb";
import { LogoIcon } from "../../components/LogoIcon";
import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";

export function Home() {

    const userData = localStorage.getItem("user");

    if (!userData) {
        console.error("Acessa ai, acessa ai")

        return <Navigate to='/login' />
    }

    const user = JSON.parse(userData);

    const [boards, setBoards] = useState<string[]>([]);

    const listBoards = ["Board1", "Board2", "Board3"];

    function renderButtonBoard() {
        return boards.map((board) => (
            <button className={styles.boardCard}>
                <div className={styles.boardCardTop}>
                    <div className={styles.boardIconWrapper}>
                        <LogoIcon className={styles.iconCustom} size={16} />
                    </div>
                    <div className={styles.boardArrow}>
                        <FaArrowRight />
                    </div>
                </div>
                <h3 className={styles.boardCardName}>
                    Desenvolvimento
                </h3>
                <p className={styles.boardCardDescription}>
                    Tarefas de desenvolvimento de software e tecnologia
                </p>
                <div className={styles.boardCardFooter}>
                    <span className={styles.boardBadge}> {board} </span>
                </div>
            </button>
        ));
    }

    useEffect(() => {
        setBoards(listBoards)
    }, []);

    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <div className={styles.headerInner}>
                    <div>
                        <Logo
                            className={styles.logoCustom} size={16}
                            iconClassName={styles.iconCustom} />
                    </div>
                    <div className={styles.headerRight}>
                        <div className={styles.avatar}>
                            <img src={avatar} alt="Avatar" />
                        </div>
                        <span className={styles.username}>{user.userName}</span>
                        <button className={styles.logoutButton}>
                            <Link to="/login" className={styles.link}>
                                <MdLogout size={16} className={styles.linkIcon} fill="rgb(100, 116, 139)" />
                                <span className={styles.span}>
                                    Sair
                                </span>
                            </Link>
                        </button>
                    </div>
                </div>
            </header >
            <div className={styles.content}>
                <div className={styles.titleSection}>
                    <div className={styles.titleIcon}>
                        <TbLayoutGrid size={20} color={"#10b77f"} />
                    </div>
                    <div>
                        <h1 className={styles.titleText}> Seus Boards</h1>
                        <p className={styles.titleSubtext}> Ola, {user.userName}. Selecione um board para gerenciar suas tarefas. </p>
                    </div>
                </div>
                <div className={styles.boardGrid}>
                    {renderButtonBoard()}
                    {/* <button className={styles.boardCard}>
                        <div className={styles.boardCardTop}>
                            <div className={styles.boardIconWrapper}>
                                <LogoIcon className={styles.iconCustom} size={16}
                                    style={{ backgroundColor: "rgb(14, 165, 233)" }} />
                            </div>
                            <div className={styles.boardArrow}>
                                <FaArrowRight />
                            </div>
                        </div>
                        <h3 className={styles.boardCardName}>
                            Marketing
                        </h3>
                        <p className={styles.boardCardDescription}>
                            Campanhas, leads e tudo que há de bom
                        </p>
                        <div className={styles.boardCardFooter}>
                            <span className={styles.boardBadge}> 5 tarefas </span>
                        </div>
                    </button>
                    <button className={styles.boardCard}>
                        <div className={styles.boardCardTop}>
                            <div className={styles.boardIconWrapper}>
                                <LogoIcon className={styles.iconCustom} size={16}
                                    style={{ backgroundColor: "rgb(245, 158, 11)" }} />
                            </div>
                            <div className={styles.boardArrow}>
                                <FaArrowRight />
                            </div>
                        </div>
                        <h3 className={styles.boardCardName}>
                            Treino
                        </h3>
                        <p className={styles.boardCardDescription}>
                            Tarefas para aplicar no dia a dia para saúde
                        </p>
                        <div className={styles.boardCardFooter}>
                            <span className={styles.boardBadge}> 5 tarefas </span>
                        </div>
                    </button>
                    <button className={styles.boardCard}>
                        <div className={styles.boardCardTop}>
                            <div className={styles.boardIconWrapper}>
                                <LogoIcon className={styles.iconCustom} size={16}
                                    style={{ backgroundColor: "rgb(244, 63, 94)" }} />
                            </div>
                            <div className={styles.boardArrow}>
                                <FaArrowRight />
                            </div>
                        </div>
                        <h3 className={styles.boardCardName}>
                            Estudos
                        </h3>
                        <p className={styles.boardCardDescription}>
                            Coisas para estudar sobre programação
                        </p>
                        <div className={styles.boardCardFooter}>
                            <span className={styles.boardBadge}> 5 tarefas </span>
                        </div>
                    </button> */}
                </div>
            </div>
        </main >
    )
}