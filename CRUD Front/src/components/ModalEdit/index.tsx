import { useState } from "react";
import api from "../../services/api"
import styles from "../ModalDelete/style.module.css"

export function ModalDelete() {

    const [deleteBoard, setDeleteBoard] = useState(false);

    async function confirmDelete(boardId: number) {
        const boardDelete = await api.delete(`/boards/${boardId}`)
        setDeleteBoard(boardDelete)
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <h2> Confirmar exclusão </h2>
                    <p> Esta ação é irreversível. A tarefa será permanentemente excluída e não poderá ser recuperada. </p>
                </div>
                <div className={styles.modalOptions}>
                    <button className={styles.btnConfirm}>Confirmar</button>
                    <button className={styles.btnCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}