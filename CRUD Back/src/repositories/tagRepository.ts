import { prisma } from "../database/prisma";

export async function createTag(name: string, numberBoardId: number) {

    try {

        const now = new Date();

        const tag = prisma.tag.create({
            data: {
                name: name,
                created_at: now,
                updated_at: now,
                is_deleted: false,
                board_id: numberBoardId
            },
        })

        return tag;

    } catch (error: any) {
        console.error("Ocorreu um erro ao criar uma tag no banco de dados", error);
        throw new Error(error?.message ?? "Ocorreu um erro ao criar uma tag no banco de dados");
    }
}

export async function getAllTag() {
    try {
        const tags = await prisma.tag.findMany({
            orderBy: {
                id: 'asc'
            }
        })

        return {
            total: tags.length,
            tags: tags
        }
    } catch (error: any) {
        console.error("Ocorreu um erro ao buscar todas as tags no banco de dados", error);
        throw new Error(error?.message ?? "Ocorreu um erro ao buscar todas as tags no banco de dados");
    }
}

export async function getTagById(tagId: number) {

    try {
        const tag = await prisma.tag.findUnique({
            where: {
                id: tagId,
            },
        })

        if (!tag) {
            throw new Error("Esse ID não existe, informe um ID existente!");
        }

        return tag;
    } catch (error: any) {

        console.error("Ocorreu um erro ao buscar a tag informada no banco de dados", error);

        throw new Error(error?.message ?? "Ocorreu um erro ao buscar a tag informada no banco de dados");
    }
}

export async function deleteTag(tagId: number) {

    try {

        const tag = await prisma.tag.update({
            where: {
                id: tagId,
            },
            data: {
                is_deleted: true,
            },
        })

        if (!tag) {
            throw new Error("Nenhuma tag encontrada com o ID infomado");
        }

        return {
            message: "Tag deletada com sucesso!",
            tag: tag
        }
    } catch (error: any) {
        console.error("Ocorreu um erro ao deletar a tag do banco de dados!", error);
        throw new Error(error?.message ?? "Ocorreu um erro ao deletar a tag do banco de dados")
    }
}

export async function updateTag(tagId: number, name: string, boardId: number, filter?: boolean) {

    try {
        const tag = await prisma.tag.update({
            where: {
                id: tagId,
            },
            data: {
                name: name,
                board_id: boardId,
                is_deleted: filter,
            },
        })

        if (!tag) {
            throw new Error("Nenhuma tag encontrada com o ID informado!")
        }

        return {
            message: "Tag atualizada com sucesso",
            tag: tag
        }
    } catch (error: any) {
        console.error("Ocorreu um erro ao editar a tag no banco de dados", error);
        throw new Error(error?.message ?? "Ocorreu um erro ao editar a tag no banco de dados")
    }
}