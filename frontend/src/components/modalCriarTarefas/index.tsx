import Head from "next/head";
import { FormEvent, useState } from "react";
import { api } from "../../services/apiClient";
import styles from "./styles.module.css"
import Modal from 'react-modal'


import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface ModalCriarTarefasProps {

  isOpen: boolean;
  onRequestClose: () => void;
}

type CriarTarefaProps = {

  titulo: string;
  descricao: string;
  horario: string;
  tempo: string;

}

export default function ModalCriarTarefas({ isOpen, onRequestClose }: ModalCriarTarefasProps) {


  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [horario, setHorario] = useState('')
  const [tempo, setTempo] = useState('')

  async function criarTarefa({ titulo, descricao, horario, tempo }: CriarTarefaProps) {



    try {
      const response = await api.post('/tarefa', {
        titulo,
        descricao,
        horario,
        tempo
      })

    }
    catch (err) {

      alert("err")
    }

  }
  async function handleCadastrarTarefa(event: FormEvent): Promise<void> {
    event.preventDefault();


    if (titulo || descricao || horario || tempo === '') {
      alert('Preencha todos os campos')
      return;
    }
    
    let data = {
      titulo,
      descricao,
      horario,
      tempo
    }

    criarTarefa(data);

    onRequestClose()


  }
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
            <h1 className={styles.h1}>CADASTRAR TAREFAS</h1>

            <form onSubmit={handleCadastrarTarefa} >

              <input placeholder="Título" className={styles.input}
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />

              <textarea placeholder="Descrição" className={styles.input}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />


              <input placeholder="Duração" className={styles.input}
                value={tempo}
                onChange={(e) => setTempo(e.target.value)}

              />


              <div className={styles.calendar}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DateTimePicker
                    inputFormat={"DD/MM/YY HH:mm"}
                    disablePast={true}
                    className={styles.date}
                    renderInput={(props) => <TextField {...props} />}
                    label="Data e Horário"
                    value={horario}


                    onChange={(Nhorario) => {
                      setHorario(Nhorario);
                    }}

                  />
                </LocalizationProvider>

              </div>



              <button type="submit" className={styles.button}>CRIAR</button>

            </form>


          </div>

        </div>

      </div>

    </Modal>

  )
}
