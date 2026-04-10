import {
    createTag as createTagRepository,
    getAllTag as getAllTagRepository,
    getTagById as getTagByIdRepository,
    deleteTag as deleteTagRepository,
    updateTag as updateTagRepository
} from "../repositories/tagRepository";
import { getBooleanFromQueryParam } from "../utils/getBooleanFromQueryParam";
import { stringToNumber } from "../utils/stringToNumber";

export async function createTag(name: string, boardId: string) {
    try {

        const numberBoardId = stringToNumber(boardId)

        const tag = await createTagRepository(name, numberBoardId);

        return tag;

    } catch (error: any) {

        console.log("Ocorreu um erro ao criar a tag", error);

        throw new Error(error?.message ?? "Ocorreu um erro ao criar a tag");
    }
}

export async function getAllTag() {
    try {

        const tags = await getAllTagRepository();

        return tags;

    } catch (error: any) {

        console.log("Ocorreu um erro ao listar todas as tags", error);

        throw new Error(error?.message ?? "Ocorreu um erro ao listar as tags");
    }
}

export async function getTagById(id: string) {
    try {

        const tagId = stringToNumber(id);

        const tag = await getTagByIdRepository(tagId);

        return tag;

    } catch (error: any) {

        console.log("Ocorreu um erro ao listar a tag solicitada!", error);

        throw new Error(error?.message ?? "Ocorreu um erro ao listar a tag solicitada!");
    }
}

export async function deleteTag(id: string) {

    try {

        const tagId = stringToNumber(id);

        const tag = await deleteTagRepository(tagId);

        return tag;

    } catch (error: any) {

        console.log("Ocorreu um erro ao deletar a tag solicitada!", error);

        throw new Error(error?.message ?? "Ocorreu um erro ao deletar a tag solicitada!");
    }
}

export async function updateTag(id: string, name?: string, boardId?: string, isDeleted?: boolean) {

    try {

        const tagId = stringToNumber(id);

        const filter = getBooleanFromQueryParam(isDeleted, 'is_deleted')

        const data: any = {};

        if (name) {
            const nameTrimmed = name.trim();
            if (!nameTrimmed) {
                throw new Error("Informe um nome válido ele não pode ser vazio!");
            }
            data.name = nameTrimmed;
        }

        if (boardId) {
            const numberBoardId = stringToNumber(boardId);

            data.boardId = numberBoardId;
        }

        if (!data.name && !data.boardId) {
            throw new Error("Envie ao menos um campo para atualizar")
        }

        const tag = await updateTagRepository(tagId, data?.name, data?.boardId, filter);

        return tag;

    } catch (error: any) {

        console.log("Ocorreu um erro ao editar a tag solicitada!", error);

        throw new Error(error?.message ?? "Ocorreu um erro ao editar a tag solicitada!");
    }
}