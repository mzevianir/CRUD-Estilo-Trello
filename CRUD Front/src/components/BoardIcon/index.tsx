import { LogoIcon } from "../../components/LogoIcon";
import { FaArrowRight } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import styles from "../BoardIcon/style.module.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaRegTrashAlt } from 'react-icons/fa';
import { RxPencil1 } from "react-icons/rx";

export function BoardIcon(board: any) {

    const navigate = useNavigate()

    const [popover, setPopover] = useState(false)

    const childrenClick = (event: any) => {
        event.stopPropagation();

        setPopover(!popover);
    }

    return (
        <div className={styles.boardCard} onClick={() => navigate(`/board/${board.board.id}`)}>
            <div className={styles.boardCardTop} >
                <div className={styles.boardIconWrapper}>
                    <LogoIcon className={styles.iconCustom} size={16} />
                </div>
                <div className={styles.boardActions}>
                    <div style={{ position: "relative" }}>
                        <button className={styles.boardEdit} onClick={childrenClick}>
                            <BsThreeDotsVertical />
                        </button>
                        {popover && <div className={styles.popover}>
                            <button className={styles.btnEditPopover} onClick={childrenClick}>
                                <RxPencil1 size={16} /> Editar
                            </button>
                            <button className={styles.btnDeletePopover} onClick={childrenClick}>
                                < FaRegTrashAlt size={16} /> Excluir</button>
                        </div>}
                    </div>
                    <div className={styles.boardArrow}>
                        <FaArrowRight />
                    </div>
                </div>
            </div>
            <h3 className={styles.boardCardName}>
                {board.board?.name}
            </h3>
            <p className={styles.boardCardDescription}>
                {board.board?.description}
            </p>
            <div className={styles.boardCardFooter}>
                <span className={styles.boardBadge}> AQUI É X TAREFAS, PRECISO IMPLEMENTAR </span>
            </div>
        </div>
    )
}