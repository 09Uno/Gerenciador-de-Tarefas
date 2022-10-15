import prismaClient from "../../prisma/prisma";

interface EditarTarefaRequest {
    tarefa_id: string,
    titulo: string,
    descricao: string,
    horario: Date,
    tempo: string,
    
}


class EditarTarefaService { 
    async execute({tarefa_id, titulo, descricao, horario, tempo}: EditarTarefaRequest)  {
        const tarefa = await prismaClient.tarefa.update({
            where: {
                id: tarefa_id,
            },
            data: {
                titulo: titulo,
                descricao: descricao,
                horario: horario,
                tempo: tempo
            }
        });

        return tarefa;
    }
}

export { EditarTarefaService }