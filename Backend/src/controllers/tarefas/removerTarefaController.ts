import { RemoverTarefaService } from "../../services/tarefas/removerTarefaService";
import { Request, Response } from "express";

class RemoverTarefaController{
    async handle(req: Request, res: Response){

        const tarefa_id = req.query.tarefa_id as string;

        const removerTarefaService = new RemoverTarefaService();

        const tarefa = await removerTarefaService.execute({tarefa_id});

        return res.json(tarefa);

    }
}

export { RemoverTarefaController }