import Head from "next/head";
import { useState } from "react";
import { api } from "../../services/apiClient";
import styles from "./styles.module.css"
import Modal from 'react-modal'
import { TarefasProps } from "../../pages/dashboard";
import moment from "moment";


interface ModalProps {
    isOpen: boolean,
    onRequestClose: () => void
    tarefa: TarefasProps[];
}



export default function ModalDetalhesTarefas({ isOpen, onRequestClose, tarefa }: ModalProps) {



    const customStyles = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: "auto%",
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#a6ced8',
            borderRadius: '30px',
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            className={styles.modal}
        >




            <div className={styles.containerMain}>


                <div className={styles.ContainerCenter}>

                    <div className={styles.ContainerForm}>
                        <h1 className={styles.h1}>DETALHES DA TAREFA</h1>

                        {tarefa.map( tarefa => (
                            <section key={tarefa.id}>
                                <div className={styles.textInfo}
                                >{tarefa.titulo}</div>

                                <div className={styles.DescInfo}

                                >{tarefa.descricao}</div>

                                <div className={styles.textInfo}

                                >{moment.utc(tarefa.horario).format(" DD/MM/YYYY HH:mm ")}</div>

                                <div  className={styles.textInfo}

                                >{tarefa.tempo}</div>

                            </section>
                        ))}

                    </div>


                </div>

            </div>




        </Modal >
    )

}