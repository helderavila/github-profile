import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useUser } from '../../hooks/useUser'

import { VscRepoForked } from 'react-icons/vsc'
import { AiOutlineStar, AiOutlineWarning } from 'react-icons/ai'

import styles from './profile.module.scss'

export default function Profile() {
  const router = useRouter()
  const { user, onSubmit, repositories } = useUser()
  const { userName } = router.query

  useEffect(() => {
    if (!user.userLoaded && userName) onSubmit({ user: userName }, true)
  },[userName])
  
  return (
    <>
      <Head>
        <title>{user.name} | github-profile</title>
      </Head>
      <main className={styles.container}>
        <aside className={styles.profileContainer}>
          <img src={user.avatar} alt={user.name}/>
          <h1>{user.name}</h1>
          <span>@{user.userName}</span>
          <p>{user.bio}</p>
          <div className={styles.socialContainer}>
            <p><strong>{user.following}</strong> Seguindo</p>
            <p><strong>{user.followers}</strong> Seguidores</p>
          </div>
        </aside>
        <section className={styles.reposContainer}>
          <ul>
            {repositories.map(repository => (
              <li key={repository.fullName} className={styles.repo}>
                <div className={styles.repoInfo}>
                  <strong>{repository.name}</strong>
                  <span>{repository.fullName}</span>
                </div>
                <div className={styles.repoStatus}>
                  <span>
                    <AiOutlineStar color="#adb1b3"/>
                    {repository.stars}
                  </span>
                  <span>
                    <VscRepoForked color="#adb1b3"/>
                    {repository.forks}
                  </span>
                  <span>
                    <AiOutlineWarning color="#adb1b3"/>
                    {repository.issues}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}