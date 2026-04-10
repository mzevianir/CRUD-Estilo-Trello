//Repository é o fornecedor de dados, responsável apenas pelo acesso ao banco de dados
//Ele não tem lógica de negócio, apenas faz as operações CRUD no banco de dados
//Responsabilidade: apenas acesso ao banco de dados, não tem lógica de negócio.

import { prisma } from "../database/prisma";

// Função para adicionar tag a uma task
export async function addTagToTask(taskIdNum: number, uniqueTagsId: number[]) {
    try {

        // Cria um array vazio para guardar as relações criadas no banco
        // Cada item será uma linha retornada pelo INSERT
        const inserted: any[] = [];

        // Percorre todas as tags que devem ser adicionadas à task
        for (const tagId of uniqueTagsId) {
            // Executa o INSERT no banco de dados para cada tag
            // Vincula a task (task_id) com a tag atual (tag_id)
            // RETURNING * faz o banco devolver o registro criado
            const result = await prisma.tasktag.create({
                data: {
                    task_id: taskIdNum,
                    tag_id: tagId,
                }
            })

            // Adiciona o registro retornado pelo banco dentro do array
            // result.rows[0] é a linha que acabou de ser inserida
            inserted.push(result);
        }

        // Retorna todas as relações criadas entre task e tags
        return inserted;
    } catch (error: any) {
        console.error("Ocorreu um erro ao adicionar tag à task no banco de dados", error);
        throw new Error(error?.message ?? "Ocorreu um erro ao adicionar tag à task no banco de dados");
    }
}

// Função para buscar todas as tasks de uma tag
export async function getTasksByTagId(numberTaskId: number) {

    try {

        const result = await prisma.tasktag.findMany({
            where: {
                task_id: numberTaskId,
            },
        })

        return {
            total: result.length,
            tasks: result
        };

    } catch (error: any) {

        console.error("Ocorreu um erro ao buscar tasks da tag no banco de dados", error);

        throw new Error(error?.message ?? "Ocorreu um erro ao buscar tasks da tag no banco de dados");

    }
}

// Função para remover tag de uma task
export async function removeTagFromTask(taskIdNum: number, tagIdNum: number) {

    try {
        const result = await prisma.tasktag.deleteMany({
            where: {
                task_id: taskIdNum,
                tag_id: tagIdNum,
            },
        });

        if (result.count === 0) {
            throw new Error("Nenhuma relação encontrada entre a task e a tag informadas");
        }

        return {
            message: "Tag removida da task com sucesso",
            removedRelations: result.count
        };

    } catch (error: any) {

        console.error("Ocorreu um erro ao remover tag da task no banco de dados", error);

        throw new Error(error?.message ?? "Ocorreu um erro ao remover tag da task no banco de dados");
    }
}

// Função para atualizar as tags de uma task
export async function updateTagsFromTask(taskId: number, tagIds: number[]) {
    try {
        // Remove tags duplicadas que possam vir do front
        const uniqueTagIds = [...new Set(tagIds)];

        // Apaga todas as relações atuais dessa task (limpa tudo)
        await prisma.tasktag.deleteMany({
            where: { task_id: taskId },
        });

        // Se não veio nenhuma tag, a task fica sem tags
        if (uniqueTagIds.length === 0) {
            return [];
        }

        // Cria novamente as relações (task_id + tag_id)
        for (const tagId of uniqueTagIds) {
            await prisma.tasktag.create({
                data: {
                    task_id: taskId,
                    tag_id: tagId,
                },
            });
        }

        // Retorna como ficou no banco
        return await prisma.tasktag.findMany({
            where: { task_id: taskId },
            orderBy: { id: "asc" },
        });

    } catch (error: any) {

        console.error("Erro ao atualizar as tags da task!", error);

        throw new Error(error?.message ?? "Ocorreu um erro ao atualizar as tags da task!");
    }
}