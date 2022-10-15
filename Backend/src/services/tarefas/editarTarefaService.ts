import prismaClient from "../../prisma/prisma";

interface EditarTarefaRequest {
    id: string,
    titulo: string,
    descricao: string,
    horario: Date,
    tempo: string,
    
}


class EditarTarefaService { 
    async execute({id, titulo, descricao, horario, tempo}: EditarTarefaRequest)  {
        const tarefa = await prismaClient.tarefa.update({
            where: {
                id
            },
            data: {
                titulo,
                descricao,
                horario,
                tempo
            }
        });

        return tarefa;
    }
}

export { EditarTarefaService }