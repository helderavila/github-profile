import { createContext, useContext, useState } from 'react'

import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
import axios from 'axios'

type Repository = {
  name: string;
  fullName: string;
  forks: number;
  issues: number;
  stars: number;
}

type User = {
  avatar: string;
  name: string;
  userName: string;
  bio: string;
  followers: number;
  following: number;
  userLoaded: boolean;
}

interface UserContextData {
  user: User;
  searchLoading: boolean;
  onSubmit: (userName: any, fromProfile: boolean) => void;
  repositories: Repository[];
  repositoriesLoading: boolean;
}

const UserContext = createContext({} as UserContextData)

export function UserProvider({ children }) {
  const [user, setUser] = useState<User>({
    avatar: '',
    name: '',
    userName: '',
    bio: '',
    followers: 0,
    following: 0,
    userLoaded: false,
  })
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [repositoriesLoading, setRepositoriesLoading] = useState<boolean>(false)

  const [searchLoading, setSearchLoading] = useState(false)

  const router = useRouter()

  async function loadRepos(url: string) {
    const response = await axios.get(url)

    setRepositories(response.data.map(repo => ({
      name: repo.name,
      fullName: repo.full_name,
      forks: repo.forks,
      issues: repo.open_issues_count,
      stars: repo.stargazers_count,
    })))
  }

  async function onSubmit(data, fromProfile = false) {
    setSearchLoading(true)
    try {
      const response = await axios.get(`https://api.github.com/users/${data.user}`)

      setUser({
        avatar: response.data.avatar_url,
        name: response.data.name,
        userName: response.data.login,
        bio: response.data.bio,
        followers: response.data.followers,
        following: response.data.following,
        userLoaded: true,
      })
      loadRepos(response.data.repos_url)
      setSearchLoading(false)
      if (!fromProfile) router.push(`/profile/${data.user}`)
    } catch (err) {
      if (fromProfile) router.push('/')
      setSearchLoading(false)
      toast.error('Usuário não encontrado', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      })
    }
  }

  return (
    <UserContext.Provider value={{ user, searchLoading, onSubmit, repositories, repositoriesLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)

  return context
}