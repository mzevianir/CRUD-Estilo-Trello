//Services é o cozinheiro, ou seja, a regra de negócio/cérebro, onde fica toda a lógica da coisa
//Responsabilidade: validações e regras de negócio. Ex: se a task está vazia, se o status é válido, etc.

import { Request, Response, Router } from "express";
import {
    createBoard,
    getAllBoards,
    getBoardById,
    deleteBoard,
    updateBoard
} from "../services/boardService";
import { getBooleanFromQueryParam } from "../utils/getBooleanFromQueryParam";

const boardRouter = Router();

boardRouter.post('/boards', async (req: Request, res: Response) => {
    try {
        const boardCreate = await createBoard(req.body.name, req.body.responsibleUserId);
        return res.status(200).send(boardCreate);
    } catch (error: any) {
        return res.status(400).send({
            message: error?.message ?? "Ocorreu um erro ao criar um board!"
        });
    }
});

boardRouter.get('/boards', async (req: Request, res: Response) => {
    try {
        const isDeleted = getBooleanFromQueryParam(req.query.is_deleted, 'is_deleted')

        const boardGet = await getAllBoards(isDeleted as boolean | undefined);
        return res.status(200).send(boardGet)
    } catch (error: any) {
        return res.status(400).send({
            message: error?.message ?? "Ocorreu um erro ao listar todos os boards!"
        })
    }
});

boardRouter.get('/boards/:id', async (req: Request, res: Response) => {
    try {
        const boardGetById = await getBoardById(req.params.id as string);
        return res.status(200).send(boardGetById);
    } catch (error: any) {
        return res.status(400).send({
            message: error?.message ?? "Ocorreu um erro ao listar o board!"
        })
    }
});

boardRouter.delete('/boards/:id', async (req: Request, res: Response) => {
    try {
        const boardDelete = await deleteBoard(req.params.id as string);
        return res.status(200).send(boardDelete);
    } catch (error: any) {
        return res.status(400).send({
            message: error?.message ?? "Ocorreu um erro ao deletar o board!"
        })
    }
});

boardRouter.put('/boards/:id', async (req: Request, res: Response) => {
    try {
        const boardUpdate = await updateBoard(req.params.id as string, req.body.name, req.body.isDeleted, req.body.responsibleUserId);
        return res.status(200).send({
            message: "Atualizado com sucesso!",
            board: boardUpdate
        })
    } catch (error: any) {
        return res.status(400).send({
            message: error?.message ?? "Ocorreu um erro ao editar o board"
        })
    }
});

export default boardRouter;