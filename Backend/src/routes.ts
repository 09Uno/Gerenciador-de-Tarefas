import {Router, Request, Response} from 'express';
import { CadastrarTarefaController } from './controllers/tarefas/cadastrarTarefaController';
import { EditarTarefaController } from './controllers/tarefas/editarTarefaController';
import { RemoverTarefaController } from './controllers/tarefas/removerTarefaController';
import { ListarTarefasController } from './controllers/tarefas/listarTarefasController';
import { DetalhesTarefaController } from './controllers/tarefas/detalhesTarefaController';


const router = Router();




router.get('/', (request: Request, response: Response) => {
    return response.json({message: 'Hello World'});
});

router.post("/tarefa", new CadastrarTarefaController().handle);
router.put("/tarefa", new EditarTarefaController().handle);
router.delete("/tarefa", new RemoverTarefaController().handle);
router.get("/tarefa", new ListarTarefasController().handle);
router.get('/tarefa/detalhes', new DetalhesTarefaController().handle);

export { router}