import prismaClient from "../../prisma/prisma";

class ListarTarefasService{

    async execute(){
        const tarefas = await prismaClient.tarefa.findMany({
        
            orderBy: {
                horario: 'asc'
            }

    });
    return tarefas;
        
    }
}

export { ListarTarefasService }