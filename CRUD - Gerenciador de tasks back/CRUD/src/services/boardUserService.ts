import {
  addUserToBoard as addUserToBoardRepository,
  getBoardByUsers as getBoardByUsersRepository,
  removeUserFromBoard as removeUserFromBoardRepository,
  updateUsersFromBoard as updateUsersFromBoardRepository
} from "../repositories/boardUserRepository";
import { stringToNumber } from "../utils/stringToNumber";

export async function addUserToBoard(boardId: string, userId: string) {

  try {

    const boardIdNum = stringToNumber(boardId)
    const userIdNum = stringToNumber(userId)

    const result = await addUserToBoardRepository(boardIdNum, userIdNum);

    return {
      message: "Usuário adicionado ao board com sucesso!",
      boardUser: result
    };

  } catch (error: any) {

    console.log("Ocorreu um erro ao adicionar usuário ao board", error);

    throw new Error(error?.message ?? "Ocorreu um erro ao adicionar usuário ao board");
  }
}

export async function getBoardByUsers(userId: string) {

  try {

    const userIdNum = stringToNumber(userId)

    const result = await getBoardByUsersRepository(userIdNum);

    return result;

  } catch (error: any) {

    console.log("Ocorreu um erro ao listar os boards do usuário", error);

    throw new Error(error?.message ?? "Ocorreu um erro ao listar os boards do usuário");
  }
}

export async function getUsersByBoard(boardId: string) {

  try {

    const boardIdNum = stringToNumber(boardId)

    const result = await getUsersByBoardRepository(boardIdNum);

    return result;

  } catch (error: any) {

    console.log("Ocorreu um erro ao listar os usuários do board", error);

    throw new Error(error?.message ?? "Ocorreu um erro ao listar os usuários do board");
  }
}

export async function removeUserFromBoard(boardId: string, userId: string) {

  try {

    const boardIdNum = stringToNumber(boardId)

    const userIdNum = stringToNumber(userId)

    const result = await removeUserFromBoardRepository(boardIdNum, userIdNum);

    if (!result) {
      throw new Error("Nenhuma relação encontrada entre o board e o usuário informados");
    }

    return {
      message: "Usuário removido do board com sucesso!",
      boardUser: result
    };
  } catch (error: any) {

    console.log("Ocorreu um erro ao remover usuário do board", error);

    throw new Error(error?.message ?? "Ocorreu um erro ao remover usuário do board");
  }
}

export async function updateUsersFromBoard(boardId: string, usersId: any) {

  try {

    const boardIdNum = stringToNumber(boardId)

    if (!usersId) {
      throw new Error("Envie o campo 'usersId'");
    }

    if (!Array.isArray(usersId)) {
      throw new TypeError("O campo 'usersId' precisa ser um array");
    }

    const usersIdNumber: number[] = [];

    for (const item of usersId) {
      const userIdNum = stringToNumber(item)

      usersIdNumber.push(userIdNum);
    }

    // Remove duplicados
    const uniqueUsersId = [...new Set(usersIdNumber)];

    const result = await updateUsersFromBoardRepository(boardIdNum, uniqueUsersId);

    return {
      message: "Usuários do board atualizados com sucesso!",
      usersId: uniqueUsersId,
      boardUsers: result
    };

  } catch (error: any) {

    console.log("Ocorreu um erro ao atualizar usuários do board", error);
    
    throw new Error(error?.message ?? "Ocorreu um erro ao atualizar usuários do board");
  }
}
function getUsersByBoardRepository(boardIdNum: number) {
  throw new Error("Function not implemented.");
}

