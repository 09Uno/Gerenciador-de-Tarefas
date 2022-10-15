import prismaClient from "../../prisma/prisma";

interface ApagarTarefaRequest{
    tarefa_id: string
}

class RemoverTarefaService{
    async execute({tarefa_id}: ApagarTarefaRequest) {
        const tarefa = await prismaClient.tarefa.delete({
            where: {
                id: tarefa_id
            }
        });
    }
}

export { RemoverTarefaService }