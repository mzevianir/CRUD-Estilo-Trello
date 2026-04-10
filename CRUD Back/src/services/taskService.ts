//Services é o cozinheiro, ou seja, a regra de negócio/cérebro, onde fica toda a lógica da coisa
//Responsabilidade: validações e regras de negócio. Ex: se a task está vazia, se o status é válido, etc.

import {
  createTask as createTaskRepository,
  getAllTasks as getAllTasksRepository,
  getTaskById as getTaskByIdRepository,
  deleteTaskById as deleteTaskByIdRepository,
  updateTask as updateTaskRepository
} from "../repositories/taskRepository";
import { stringToNumber } from "../utils/stringToNumber";

export async function createTask(
  title: string,
  description: string,
  status: string,
  ownerUserId: string,
  createdUserId: string,
  boardId: string,
  columnId: string) {

  const numberOwnerUserId = stringToNumber(ownerUserId);
  const numberCreatedUserId = stringToNumber(createdUserId);
  const numberBoardId = stringToNumber(boardId);
  const numberColumnId = stringToNumber(columnId);
  try {

    const task = await createTaskRepository(title, description, status, numberOwnerUserId, numberCreatedUserId, numberBoardId, numberColumnId);

    // Service monta a mensagem de sucesso{ }
    return {
      message: "Task criada com sucesso!",
      task: task
    };

  } catch (error: any) {

    console.error("Erro ao criar task:", error);
    throw new Error(error?.message ?? "Erro ao criar task no banco de dados");
  }
}

export async function getAllTasks(page?: number, limit?: number, isDeletedParam?: boolean) {
  try {

    return await getAllTasksRepository(page, limit, isDeletedParam);

  } catch (error: any) {

    console.error("Erro ao buscar tasks:", error);
    throw new Error(error?.message ?? "Erro ao buscar tasks do banco de dados");
  }
}

export async function getTaskById(id: string) {

  try {
    const taskId = stringToNumber(id);

    const task = await getTaskByIdRepository(taskId);

    // Se não encontrou nenhuma linha, retorna erro
    if (!task) {
      throw new Error("Nenhuma task foi encontrada com o id informado");
    }

    // Retorna a task encontrada
    return task;

  } catch (error: any) {

    console.error("Erro ao buscar task:", error);
    throw new Error(error?.message ?? "Erro ao buscar task do banco de dados");
  }
}

export async function deleteTask(id: string) {

  try {

    const taskId = stringToNumber(id);

    const deletedTask = await deleteTaskByIdRepository(taskId);

    // Se não encontrou nenhuma linha pra deletar, retorna erro
    if (!deletedTask) {
      throw new Error("Tarefa não encontrada");
    }

    // Retorna sucesso com a task que foi removida
    return {
      mensagem: "A task foi removida com sucesso!",
      task: deletedTask
    };

  } catch (error: any) {

    console.error("Erro ao deletar task:", error);
    throw new Error(error?.message ?? "Erro ao deletar task do banco de dados");
  }
}

export async function updateTask(
  id: string,
  title: string,
  description: string,
  status: string,
  due_date?: Date,
  is_deleted?: boolean
) {

  try {
    const taskId = stringToNumber(id);


    const task = await updateTaskRepository(taskId, title, description, status, due_date, is_deleted);

    if (!task) {
      throw new Error("Não existe nenhuma task com esse ID!");
    }

    return {
      mensagem: "Task atualizada com sucesso!",
      task: task
    };

  } catch (error: any) {

    console.error("Erro ao atualizar task:", error);
    throw new Error(error?.message ?? "Erro ao atualizar task no banco de dados");
  }
}
