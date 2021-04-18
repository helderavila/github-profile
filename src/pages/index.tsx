import Head from 'next/head'

import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlineLoading } from 'react-icons/ai'

import { useUser } from '../hooks/useUser'

import 'react-toastify/dist/ReactToastify.css';

import styles from './home.module.scss'

export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { onSubmit, searchLoading } = useUser()

  if (errors.user?.type === "required") {
    toast('Usuário é obrigatório', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    })
  }

  return (
    <>
      <Head>
        <title>home | github-profile</title>
      </Head>

      <main className={styles.container}>
        <h1>github-profile ⚡️</h1>
        <form 
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <input 
            name="user" 
            type="text" 
            placeholder="Digite o usuário"
            {...register("user", { required: true })}
          />
          <button
            type="submit"
            disabled={searchLoading}
          >
            {searchLoading ? <AiOutlineLoading color="#fff"/> : 'Buscar'}
          </button>
        </form>
      </main>
      <ToastContainer />
    </>
  )
}
