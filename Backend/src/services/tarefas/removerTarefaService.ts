import prismaClient from "../../prisma/prisma";

interface ApagarTarefaRequest {
    tarefa_id: string
}

class RemoverTarefaService {
    async execute(tarefa_id:string) {
        const tarefa = await prismaClient.tarefa.delete({
            where:{
                id: tarefa_id
            }
        })

        return tarefa
    }
}

export { RemoverTarefaService }