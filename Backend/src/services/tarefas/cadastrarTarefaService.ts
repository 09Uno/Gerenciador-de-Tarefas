import prismaClient from "../../prisma/prisma";

interface TarefaRequest {
  titulo: string,
  descricao: string,
  horario: Date,
  tempo: string
}

class CadastrarTarefaService {
  async execute({ titulo, descricao, horario, tempo }: TarefaRequest) {

    const tarefaCriada = await prismaClient.tarefa.create({
      data: {
        titulo: titulo,
        descricao: descricao,
        horario: horario,
        tempo: tempo,
      }
    }
    );
    return tarefaCriada;
  }
}

export { CadastrarTarefaService };