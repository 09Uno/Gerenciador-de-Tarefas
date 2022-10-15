import { ListarTarefasService } from "../../services/tarefas/listarTarefasService";
import { Request, Response } from "express"


class ListarTarefasController{

    async handle(request: Request, response: Response){
        const listarTarefasService = new ListarTarefasService();

        const tarefas = await listarTarefasService.execute();

        return response.json(tarefas);
    }

}

export { ListarTarefasController }