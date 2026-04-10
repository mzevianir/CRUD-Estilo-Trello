//Services é o cozinheiro, ou seja, a regra de negócio/cérebro, onde fica toda a lógica da coisa
//Responsabilidade: validações e regras de negócio. Ex: se os IDs são válidos, etc.

import {
    addTagToTask as addTagToTaskRepository,
    getTasksByTagId as getTasksByTagIdRepository,
    removeTagFromTask as removeTagFromTaskRepository,
    updateTagsFromTask as updateTagsFromTaskRepository
} from "../repositories/taskTagRepository";
import { stringToNumber } from "../utils/stringToNumber";

// Função para adicionar tag a uma task
export async function addTagToTask(taskId: string, tagsId: any) {

    try {

        const taskIdNum = stringToNumber(taskId)

        if (tagsId === undefined) {
            throw new Error("Envie o campo 'tagsId'");
        }

        if (!Array.isArray(tagsId)) {
            throw new TypeError("O campo 'tagsId' precisa ser um array");
        }

        const tagsIdNumber: number[] = [];

        for (const item of tagsId) {

            const tagIdNum = stringToNumber(item)

            tagsIdNumber.push(tagIdNum);
        }

        const uniqueTagsId = [...new Set(tagsIdNumber)];

        const result = await addTagToTaskRepository(taskIdNum, uniqueTagsId);

        return {
            message: "Tag adicionada à task com sucesso!",
            taskTag: result
        };
    } catch (error: any) {

        console.log("Ocorreu um erro ao adicionar tag à task", error);

        throw new Error(error?.message ?? "Ocorreu um erro ao adicionar tag à task");
    }
}

// Função para buscar todas as tasks de uma tag
export async function getTasksByTagId(taskId: string) {

    try {

        const numberTaskId = stringToNumber(taskId)

        const tasks = await getTasksByTagIdRepository(numberTaskId);

        return tasks;

    } catch (error: any) {

        console.log("Ocorreu um erro ao listar tasks da tag", error);

        throw new Error(error?.message ?? "Ocorreu um erro ao listar tasks da tag");
    }
}

// Função para remover tag de uma task
export async function removeTagFromTask(taskId: string, tagId: string) {

    try {

        const taskIdNum = stringToNumber(taskId);
        const tagIdNum = stringToNumber(tagId);

        const result = await removeTagFromTaskRepository(taskIdNum, tagIdNum);

        return {
            message: "Tag removida da task com sucesso!",
            taskTag: result
        };

    } catch (error: any) {

        console.log("Ocorreu um erro ao remover tag da task", error);

        throw new Error(error?.message ?? "Ocorreu um erro ao remover tag da task");
    }
}

export async function updateTagsFromTask(taskId: string, tagsId: any) {

    try {

        const numberTaskId = stringToNumber(taskId);

        if (!tagsId) {
            throw new Error("Envie o campo de tagsId")
        }

        // Verifica se o campo é um array 
        if (!Array.isArray(tagsId)) {
            throw new TypeError("O campo tagsId precisa ser um array")
        }

        // Cria um array vazio do tipo number
        const numberTagsId: number[] = []

        for (const item of tagsId) {

            const tagId = stringToNumber(item)

            // Insere no array vazio
            numberTagsId.push(tagId);
        }

        const uniqueTagsId = [...new Set(numberTagsId)];


        const result = await updateTagsFromTaskRepository(numberTaskId, uniqueTagsId);

        return {
            message: "Tags atualizada com sucesso!",
            tags: result
        }

    } catch (error: any) {

        console.log("Ocorreu um erro ao remover a tag da task", error);

        throw new Error(error?.message ?? "Ocorreu um erro ao atualizar as tags da task")
    }
}