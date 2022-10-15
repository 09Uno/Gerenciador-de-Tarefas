import { RemoverTarefaService } from "../../services/tarefas/removerTarefaService";
import { Request, Response } from "express";

class RemoverTarefaController{
    async handle(req: Request, res: Response){

        const {id} = req.body;

        const removerTarefaService = new RemoverTarefaService();

        const tarefa = await removerTarefaService.execute(id);

        return res.json(tarefa);

    }
}

export { RemoverTarefaController }