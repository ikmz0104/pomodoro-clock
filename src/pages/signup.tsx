import { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import firebase from "firebase";
import { auth } from '../../lib/db'
import { AuthContext } from '../auth/AuthProvider'

const SignUp: React.FC = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && Router.push('/')
    })
  }, [])

  const createUser = async (e) => {
    e.preventDefault()
    try {
      await auth.createUserWithEmailAndPassword(email, password)
      Router.push('/login')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="wrapper">
      <form className="auth" onSubmit={createUser}>
        <div>
          <label htmlFor="email" className="auth-label">
            Email:{' '}
          </label>
          <input
            id="email"
            className="auth-input"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label htmlFor="password" className="auth-label">
            Password:{' '}
          </label>
          <input
            id="password"
            className="auth-input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="auth-btn" type="submit">
          SignUp
        </button>
      </form>
      <Link href="/login">
        <a className="auth-link">Login</a>
      </Link>
    </div>
  )
}

export default SignUp