import { Request, Response } from "express";
import { DetalhesTarefaService } from "../../services/tarefas/detalhesTarefaService";

class DetalhesTarefaController {
    async handle(req: Request, res: Response) {

        const tarefa_id = req.query.tarefa_id as string
    
        const detalhesTarefaService = new DetalhesTarefaService();
    
        const tarefa = await detalhesTarefaService.execute({ tarefa_id });
    
        return res.json(tarefa);
    }
}

export  { DetalhesTarefaController };