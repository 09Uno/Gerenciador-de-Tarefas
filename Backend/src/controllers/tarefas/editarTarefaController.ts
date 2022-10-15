import { EditarTarefaService } from "../../services/tarefas/editarTarefaService";
import { Request, Response } from "express";


class EditarTarefaController{
    async handle(req: Request, res: Response){

        const {id, titulo, descricao, horario, tempo } = req.body;

        const editarTarefaService = new EditarTarefaService();

        const tarefa = await editarTarefaService.execute({id, titulo, descricao, horario, tempo});

        return res.json(tarefa);

    }
}

export { EditarTarefaController }