import styles from "./style.module.css"
import { BsListTask } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { Link, Navigate } from "react-router-dom";
import avatar from "../../assets/avatar.jpg";
import { IoIosArrowBack } from "react-icons/io";
import { GrFormSearch } from "react-icons/gr";

export function Board() {

    const userData = localStorage.getItem("user");

    if (!userData) {
        console.error("Acessa ai, acessa ai")

        return <Navigate to='/login' />
    }

    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <div className={styles.headerInner}>
                    <div className={styles.logo}>
                        <button className={styles.btnArrow}>
                            <Link to="/">
                                <IoIosArrowBack size={16} className={styles.linkIcon} />
                            </Link>
                        </button>
                        <div className={styles.icon}>
                            <BsListTask />
                        </div>
                        <div className={styles.board}>
                            <p className={styles.titleLogo}>TaskBoard</p>
                            <p className={styles.selectedBoard}>Board: board selecionado</p>
                        </div>
                    </div>
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
                </div>
            </header >
            <div className={styles.container}>
                <h1 className={styles.h1}>Desenvolvimento</h1>
                <p className={styles.p}>Gerencie e acompanhe as tarefas deste board</p>

                <div className={styles.taskGrid}>
                    <div className={styles.taskFilter}>
                        <div className={styles.taskWrapper}>
                            <label className={styles.taskSearch}>Buscar tarefa</label>
                            <div className={styles.taskInput}>
                                <div className={styles.taskSearchIcon}>
                                    <GrFormSearch size={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                </div>
                                <input id="searchTask" className={styles.searchTask} placeholder="Informe o título da task" />
                            </div>
                        </div>

                        <div className={styles.taskResponsible}>
                            <label className={styles.taskSearch}>
                                Responsável
                            </label>

                            <select id="filterResponsavel" className={styles.filterResponsavel}>
                                <option>Todos (adicionar script)</option>
                                <option>Mateus</option>
                                <option>Gaby</option>
                                <option>Casa</option>
                            </select>
                        </div>

                        <button className={styles.taskAdd} type="submit">
                            {/* <svg>Imagem de mais</svg> */}
                            Adicionar
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}