import { Request, Response, Router } from "express";
import {
    createTag,
    getAllTag,
    getTagById,
    deleteTag,
    updateTag
} from "../services/tagService";

const tagRouter = Router();

tagRouter.post('/tag', async (req: Request, res: Response) => {

    try {
        const tagCreate = await createTag(req.body.name, req.body.boardId);

        return res.status(200).send(tagCreate)

    } catch (error: any) {

        return res.status(400).send({
            message: error?.message ?? "Ocorreu um erro ao criar a tag pelo Controller"
        })
    }
});

tagRouter.get('/tags', async (req: Request, res: Response) => {

    try {
        const tagGet = await getAllTag();

        return res.status(200).send(tagGet);

    } catch (error: any) {

        return res.status(400).send({
            message: error?.message ?? "Ocorreu um erro ao buscar todas as tags"
        });
    }
});

tagRouter.get('/tag/:id', async (req: Request, res: Response) => {
    try {
        const tagGetById = await getTagById(req.params.id as string);

        return res.status(200).send(tagGetById);

    } catch (error: any) {

        return res.status(400).send({
            message: error?.message ?? "Ocorreu um erro ao listar a tag solicitada"
        })
    }
});

tagRouter.delete('/tag/:id', async (req: Request, res: Response) => {

    try {
        const tagDelete = await deleteTag(req.params.id as string);

        return res.status(200).send(tagDelete);

    } catch (error: any) {

        return res.status(400).send({
            message: error?.message ?? "Ocorreu um erro ao deletar a tag solicitada!"
        })
    }
});

tagRouter.put('/tag/:id', async (req: Request, res: Response) => {

    try {
        const tagUpdate = await updateTag(req.params.id as string, req.body.name, req.body.boardId, req.body.isDeleted);

        return res.status(200).send(tagUpdate);

    } catch (error: any) {

        return res.status(400).send({
            message: error?.message ?? "Ocorreu um erro ao editar a tag informada"
        });
    }
});

export default tagRouter; 