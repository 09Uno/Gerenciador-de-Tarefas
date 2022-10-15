import { PrismaClient } from '@prisma/client';

interface RequestTarefa{
    tarefa_id : string
}

class DetalhesTarefaService {


  async execute({tarefa_id}: RequestTarefa) {

    const prisma = new PrismaClient();

    const tarefa = await prisma.tarefa.findMany({
      where: {
        id: tarefa_id
      },
      select: {
        titulo: true,
        descricao: true,
        horario: true,
        tempo: true,
      },
    });

    return tarefa;
  }
}

export { DetalhesTarefaService };