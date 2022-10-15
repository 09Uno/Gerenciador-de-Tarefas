import prismaClient from "../../prisma/prisma";


class RemoverTarefaService{
    async execute(id: string) {
        const tarefa = await prismaClient.tarefa.delete({
            where: {
                id
            }
        });
    }
}

export { RemoverTarefaService }