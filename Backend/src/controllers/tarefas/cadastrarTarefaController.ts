import { Request, Response } from 'express';
import { CadastrarTarefaService } from "../../services/tarefas/cadastrarTarefaService";


class CadastrarTarefaController {
  async handle(req: Request, res: Response) {

    const { titulo, descricao, horario, tempo } = req.body;

    const cadastrarTarefaService = new CadastrarTarefaService();

    const tarefa = await cadastrarTarefaService.execute({
      titulo,
      descricao,
      horario,
      tempo,
    });

    return res.json(tarefa);
  }
}

export { CadastrarTarefaController };