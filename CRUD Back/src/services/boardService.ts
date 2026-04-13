//Services é o cozinheiro, ou seja, a regra de negócio/cérebro, onde fica toda a lógica da coisa
//Responsabilidade: validações e regras de negócio. Ex: se a task está vazia, se o status é válido, etc.

import {
    createBoard as createBoardRepository,
    getAllBoards as getAllBoardsRepository,
    getBoardById as getBoardByIdRepository,
    deleteBoard as deleteBoardRepository,
    updateBoard as updateBoardRepository
} from "../repositories/boardRepository";
import { addUserToBoard } from "./boardUserService";
import { getBooleanFromQueryParam } from "../utils/getBooleanFromQueryParam";
import { stringToNumber } from "../utils/stringToNumber";

export async function createBoard(name: string, responsibleUserId: string, description: string) {
    try {

        const numberResponsibleUserId = stringToNumber(responsibleUserId);

        const board = await createBoardRepository(name, numberResponsibleUserId, description);

        // Assim que cria um board, pega o id do responsável/user que criou pelo board e cria uma relação automática
        await addUserToBoard(String(board.id), responsibleUserId);

        return {
            message: "Board criado com sucesso!",
            board: board
        }
    } catch (error: any) {
        console.log("Erro ao criar o board!", error);
        throw new Error(error?.message ?? "Erro ao criar o board no banco de dados");
    }
}

export async function getAllBoards(isDeleted?: boolean) {
    try {
        const board = await getAllBoardsRepository(isDeleted);

        return {
            board: board
        }
    } catch (error: any) {
        console.log("Erro ao listar todos os bords", error);
        throw new Error(error?.message ?? "Erro ao listar todos os boards do banco de dados");
    }
}

export async function getBoardById(id: string) {

    try {
        const boardId = stringToNumber(id)

        const board = await getBoardByIdRepository(boardId);

        return {
            board: board
        }
    } catch (error: any) {
        console.log("Erro ao listar o board!", error);
        throw new Error(error?.message ?? "Erro ao listar o board do banco de dados");
    }
}

export async function deleteBoard(id: string) {

    try {

        const boardId = stringToNumber(id)

        const board = await deleteBoardRepository(boardId)

        return {
            board: board
        }
    } catch (error: any) {
        console.log("Erro ao deletar o board!", error);
        throw new Error(error?.message ?? "Erro ao deletar o board do banco de dados!");
    }
}

export async function updateBoard(id: string, name: string, isDeleted: string, responsibleUserId: string) {

    try {

        const boardId = stringToNumber(id)

        const numberResponsibleUserId = stringToNumber(responsibleUserId)

        const booleanIsDeleted = getBooleanFromQueryParam(String(isDeleted), 'is_deleted')

        const board = await updateBoardRepository(boardId, name, numberResponsibleUserId, booleanIsDeleted)

        return board

    } catch (error: any) {
        console.log("Erro ao atualizar board!", error)
        throw new Error(error?.message ?? "Erro ao atualizar o board no banco de dados!");

    }

}