import Head from 'next/head'
import { useRouter } from 'next/router'

import { VscRepoForked } from 'react-icons/vsc'
import { AiOutlineStar, AiOutlineWarning } from 'react-icons/ai'


import styles from './profile.module.scss'

export default function Profile() {
  const router = useRouter()
  const { user } = router.query

  return (
    <>
      <Head>
        <title>{user} | github-profile</title>
      </Head>
      <main className={styles.container}>
        <aside className={styles.profileContainer}>
          <img src="https://avatars.githubusercontent.com/u/32720546?v=4" alt="teste"/>
          <h1>Helder Avila</h1>
          <span>@helderavila</span>
          <p>Desenvolvedor Front-end apaixonado por criar interfaces.</p>
          <div className={styles.socialContainer}>
            <p><strong>29</strong> Seguindo</p>
            <p><strong>29</strong> Seguidores</p>
          </div>
        </aside>
        <section className={styles.reposContainer}>
          <ul>
            <li className={styles.repo}>
              <div className={styles.repoInfo}>
                <strong>aircnc-backend</strong>
                <span>helderavila/aircnc-backend</span>
              </div>
              <div className={styles.repoStatus}>
                <span>
                  <AiOutlineStar color="#adb1b3"/>
                  250
                </span>
                <span>
                  <VscRepoForked color="#adb1b3"/>
                  250
                </span>
                <span>
                  <AiOutlineWarning color="#adb1b3"/>
                  250
                </span>
              </div>
            </li>
          </ul>
        </section>
      </main>
    </>
  )
}