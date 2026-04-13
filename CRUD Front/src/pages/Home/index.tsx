import styles from "./style.module.css"
import { Logo } from "../../components/Logo"
import { MdLogout } from "react-icons/md";
import { Link, Navigate, useNavigate } from "react-router-dom";
import avatar from "../../assets/avatar.jpg";
import { TbLayoutGrid } from "react-icons/tb";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { BoardIcon } from "../../components/BoardIcon";

export function Home() {

    type Board = {
        board: any;
        id: number;
        name: string;
        is_deleted: boolean;
        create_user_id: number;
        responsible_user_id: number;
    }

    const userData = localStorage.getItem("user");

    if (!userData) {
        console.error("Acessa ai, acessa ai")

        return <Navigate to='/login' />
    }

    const user = JSON.parse(userData);

    const userId = Number(user.userId);

    const [boards, setBoards] = useState<Board[]>([]);

    async function getBoards(userId: number) {
        const listBoards = await api.get(`/user/${userId}/boards`)
        setBoards(listBoards.data.boards)
    }

    useEffect(() => {
        getBoards(userId)
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
                    {boards.map((board) => {
                        if (board.board.is_deleted === false) {
                            return <BoardIcon key={board.id} board={board.board} />
                        }
                    })}
                </div>
            </div>
        </main >
    )
}