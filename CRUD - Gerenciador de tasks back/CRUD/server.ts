// NPM = node package manager (gerenciador de pacotes do node)
/* CADASTRO DE TASK
    [x]Criar umas task (post)
    [x]Deletar uma task (delete)
    [ ]Editar uma task (put)
    [x]Ver as tasks (get)

    JSON = javascript objetct notation
    Padrão de dados da internet
*/

//server vai ser importado libs e arquivos/rotas de dentro da aplicação

// import = importa uma biblioteca
import express from "express";
import cors from "cors";
import taskRouter from "./src/controllers/tasksController";
import boardRouter from "./src/controllers/boardController";
import columnsRouter from "./src/controllers/columnsController";
import tagRouter from "./src/controllers/tagController";
import usersRouter from "./src/controllers/usersController";
import boardUserRouter from "./src/controllers/boardUserController";
import taskTagRouter from "./src/controllers/taskTagController";

// coloca a função do express em uma const pra facilitar o uso
export const app = express();

// Informa o express que será utilizado JSON
app.use(express.json());

// Configura CORS para permitir requisições do frontend
app.use(cors({
  origin: "*", // Permite todas as origens (em produção, especifique a URL do frontend)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(taskRouter);
app.use(boardRouter);
app.use(columnsRouter);
app.use(tagRouter);
app.use(usersRouter);
app.use(boardUserRouter);
app.use(taskTagRouter);


// INICIA O SERVIDOR
app.listen(3000, () => {
  console.log("Chama papito, to lá na porta 3000 cola em mim!");
});