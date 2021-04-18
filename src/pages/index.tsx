import Head from 'next/head'

import styles from './home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>home | github-profile</title>
      </Head>

      <main className={styles.container}>
        <h1>github-profile ⚡️</h1>
        <form className={styles.formContainer}>
          <input type="text" placeholder="Digite o usuário"/>
          <button
            type="button"
          >
            Buscar
          </button>
        </form>
      </main>
    </>
  )
}
