// Controller é o garçom, ele serve apenas para receber a requisição e retornar a resposta
// Responsabilidade: receber HTTP e chamar o Service (Regra de negócio) e devolver a resposta para o front.

import { Request, Response, Router } from "express";
import {
    addTagToTask,
    getTasksByTagId,
    removeTagFromTask,
    updateTagsFromTask
} from "../services/taskTagService";

const taskTagRouter = Router();

// Rota para adicionar tag a uma task
taskTagRouter.post('/task/:taskId/tags', async (req: Request, res: Response) => {
    try {

        const result = await addTagToTask(req.params.taskId as string, req.body.tagsId);

        return res.status(200).send(result);

    } catch (error: any) {

        return res.status(400).send({
            message: error?.message ?? "Ocorreu um erro ao adicionar tag à task"
        });
    }
});

// Rota para buscar todas as tags de uma task
taskTagRouter.get('/task/:taskId/tags', async (req: Request, res: Response) => {

    try {

        const result = await getTasksByTagId(req.params.taskId as string);

        return res.status(200).send(result);

    } catch (error: any) {

        return res.status(400).send({
            message: error?.message ?? "Ocorreu um erro ao buscar tags da task"
        });
    }
});

// Rota para remover tag de uma task
taskTagRouter.delete('/task/:taskId/tag/:tagId', async (req: Request, res: Response) => {

    try {

        const result = await removeTagFromTask(req.params.taskId as string, req.params.tagId as string);

        return res.status(200).send(result);

    } catch (error: any) {

        return res.status(400).send({
            message: error?.message ?? "Ocorreu um erro ao remover tag da task"
        });
    }
});

taskTagRouter.put('/task/:taskId/tags', async (req: Request, res: Response) => {

    try {

        const result = await updateTagsFromTask(req.params.taskId as string, req.body.tagsId);

        return res.status(200).send(result);

    } catch (error: any) {
        
        return res.status(400).send({
            message: error?.message ?? "Ocorreu um erro ao atualizar as tags da task"
        })
    }
});

export default taskTagRouter;
