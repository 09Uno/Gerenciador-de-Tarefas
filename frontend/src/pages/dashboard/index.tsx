import Head from 'next/head'
import styles from './styles.module.css'
import { IoAddOutline } from 'react-icons/io5'
import { FaEdit } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import ModalCriarTarefas from '../../components/modalCriarTarefas'
import { FormEvent, useEffect, useState } from 'react'
import { setupAPICliente } from '../../services/api'
import moment from 'moment'
import ModalDetalhesTarefas from '../../components/modalDetalhesTarefas'
import { ListItem } from '@mui/material'
import ModalEditarTarefas from '../../components/modalEditarTarefa'


export type TarefasProps = {
    id: string,
    titulo: string,
    descricao: string,
    horario: string,
    tempo: string,
    tarefa_id: string,
}

interface HomeProps {

    tarefas: TarefasProps[];

}



export default function Dashboard({ tarefas }: HomeProps) {

    const [tarefasList, setTarefasList] = useState(tarefas || [])

    const [modalCriarTarefaVisible, setModalCriarTarefaVisible] = useState(false)


    const [modalDetalhesTarefaItem, setModalDetalhesTarefaItem] = useState<TarefasProps[]>([])
    const [modalDetalhesTarefaVisible, setModalDetalhesTarefaVisible] = useState(false)

    const [modalEditarTarefasItem, setModalEditarTarefasitem] = useState<TarefasProps[]>([])
    const [modalEditarTarefasVisible, setModalEditarTarefasVisible] = useState(false)




    //separar dia mês e ano para buscas
    const dia = tarefasList.map(item => item.horario)
    const diaFiltro = dia.filter((item, index) => dia.indexOf(item) === index)

    const mes = tarefasList.map(item => item.horario.slice(0, 7))
    const mesFiltro = mes.filter((item, index) => mes.indexOf(item) === index)

    const ano = tarefasList.map(item => item.horario.slice(0, 7))
    const anoFiltro = ano.filter((item, index) => ano.indexOf(item) === index)

    //Filtros para listagem de tarefas
    
    const [busca, setBusca] = useState('')
    const [filtro, setFiltro] = useState('')
    const Lbusca = busca.toLowerCase()
    const tarefaBusca = tarefasList.filter((item => item.titulo.toLowerCase().includes(Lbusca) && item.horario.toString().includes(filtro.toString()) || moment(item.horario).format('DD/MM/YYYY').includes(filtro.toString())
        || moment(item.horario).format('MM/YYYY').includes(filtro.toString()) || moment(item.horario).format('YYYY').includes(filtro.toString())))

    function handleCloseModalCriarTarefas() {
        setModalCriarTarefaVisible(false)
    }

    function handleModalCriarTarefas() {

        setModalCriarTarefaVisible(true)


    }


    function handleCloseModalDetalhesTarefa() {
        setModalDetalhesTarefaVisible(false)
    }

    async function handleModalDetalhesTarefa(tarefa_id: string) {

        try {
            const api = setupAPICliente()

            const response = await api.get('tarefa/detalhes', {
                params: {
                    tarefa_id: tarefa_id,
                }
            })
            setModalDetalhesTarefaItem(response.data)
            setModalDetalhesTarefaVisible(true)
        } catch (err) {
            alert("erro")
        }
    }

    function handleCloseModalEditarTarefas() {
        setModalEditarTarefasVisible(false)
    }


    async function handleModalEditarTarefas(tarefa_id: string) {



        try {
            const api = setupAPICliente()

            const response = await api.get('tarefa/detalhes', {
                params: {
                    tarefa_id: tarefa_id,
                }
            })
            setModalEditarTarefasVisible(true)
            setModalEditarTarefasitem(response.data)

        } catch (err) {
            alert("erro")
        }

    }



    /*
    
     //Apagar tarefa   
    async function apagarAgendamento(id_delete: string) {
    
        const apiDelete = await api.elete('/agendar', {
    
            params: {
                agendamento_id: id_delete,
            }
    
        })
    
    }
    
    async function apagar(id_delete: string) {
    
        apagarAgendamento(id_delete);
    
    
    }
    
    //apagar tarefas que já passaram automáticamente
    useEffect(() => {
    
        tarefasList.forEach(tarefa => {
            moment.locale('pt-br');
            const now = new Date();
    
            
            const hora = moment.utc(tarefa.horario).format('DD-MM-YYYY HH:mm')
            const hora2 = moment(now).format('DD-MM-YYYY HH:mm')
    
    
            const dataCompare = new Date(hora)
            const nowCompare = new Date(hora2)
    
            
    
    
    
            if (nowCompare > dataCompare) {
                apagar(tarefa.id)
    
            }
             
    
        });
    
    }, [tarefasList]
    )
    
    */

    //atualizar lista de tarefas


    async function atualizarLista() {
        const api = setupAPICliente()

        try {
            const response = await api.get("/tarefa")
            setTarefasList(response.data)
        } catch (err) {
            alert("erro")
        }

    }

    useEffect(() => { atualizarLista() }, [tarefasList])

    return (
        <>

            <Head>
                <title> Suas Tarefas  </title>
            </Head>


            <div className={styles.container}>

                <div className={styles.containerCenter}>

                    <div className={styles.head}>
                        <h2 className={styles.h2}>TAREFAS AGENDADAS</h2>
                        <button className={styles.add} onClick={handleModalCriarTarefas}>
                            <IoAddOutline size={35} color="black" />
                        </button>
                    </div>
                    <article className={styles.listarAgendamentos}>

                        <div className={styles.listar}>


                            <select value={filtro} onChange={(e) => setFiltro(e.target.value)} className={styles.opcao}>

                                <option value="">Filtrar por Período</option>

                                <optgroup label='DIA'>

                                    {diaFiltro.map(item => (

                                        <option placeholder="DIA" key={item} value={item}

                                        >  {moment.utc(item).format("DD/MM/YYYY")}</option>
                                    ))}

                                </optgroup>

                                <optgroup label='MÊS'>

                                    {mesFiltro.map(item => (

                                        <option placeholder="MÊS" key={item} value={moment.utc(item).format("MM/YYYY")}

                                        >  {moment.utc(item).format("MM/YYYY")}</option>

                                    ))}

                                </optgroup>

                                <optgroup label='ANO'>

                                    {anoFiltro.map(item => (

                                        <option placeholder="ANO" key={item} value={moment.utc(item).format("YYYY")}

                                        >  {moment.utc(item).format("/YYYY")}</option>

                                    ))}

                                </optgroup>

                            </select>



                            <input placeholder="pesquise o título da tarefa" value={busca}
                                onChange={(e) => setBusca(e.target.value)}
                                className={styles.buscar} />

                        </div>


                        {tarefaBusca.length === 0 && (
                            <p className={styles.emptyList}>
                                Nenhum tarefa agendada...
                            </p>
                        )}




                        {tarefaBusca.map(tarefas => (


                            <section key={tarefas.id} className={styles.agendamentos}>

                                <div className={styles.button} >

                                    <div className={styles.tag}></div>
                                    <div onClick={() => handleModalDetalhesTarefa(tarefas.id)} className={styles.titulo}>
                                        <span className={styles.tarefa}>{tarefas.titulo}</span>
                                    </div>
                                    <div onClick={() => handleModalDetalhesTarefa(tarefas.id)} className={styles.horario}>
                                        <span>{moment.utc(tarefas.horario).format(" DD/MM/YYYY HH:mm ")}</span>
                                    </div>

                                    <div className={styles.funcoes}>
                                        <button onClick={() => handleModalEditarTarefas(tarefas.id)} className={styles.funcButton} > <FaEdit size={25} color="black" /> </button>
                                        <button className={styles.funcButton}> <AiFillDelete size={25} color="black" /></button>
                                    </div>
                                </div>

                            </section>

                        ))}


                        {modalCriarTarefaVisible && (
                            <ModalCriarTarefas

                                isOpen={modalCriarTarefaVisible}
                                onRequestClose={handleCloseModalCriarTarefas}

                            />
                        )}

                        {modalDetalhesTarefaVisible && (
                            <ModalDetalhesTarefas

                                isOpen={modalDetalhesTarefaVisible}
                                onRequestClose={handleCloseModalDetalhesTarefa}
                                tarefa={modalDetalhesTarefaItem}
                            />

                        )}


                        {modalEditarTarefasVisible && (

                            <ModalEditarTarefas

                                isOpen={modalEditarTarefasVisible}
                                onRequestClose={handleCloseModalEditarTarefas}
                                tarefa={modalEditarTarefasItem}

                            />

                        )}


                    </article>
                </div>



            </div >


        </>
    )







}