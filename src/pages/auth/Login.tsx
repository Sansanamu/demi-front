import BackgroundLayout from '@/components/layout/BackgroundLayout'
import { FaGoogle, FaApple } from 'react-icons/fa'
import { SiKakaotalk } from 'react-icons/si'
import { useState, type FormEvent } from 'react' // 250811: 타입 에러 -> 타입 정의 위해 FormEvent 추가
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '@/config'

type LoginResponse = {
  result: 'success' | 'fail'
  nickname?: string
}

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

const handleLogin = async (event: FormEvent<HTMLFormElement>) => { // 타입 에러 -> 타입 지정
  event.preventDefault()
  setError('')
  try {
    const res = await axios.post<LoginResponse>( // 제네릭으로 응답 타입 수정
        `${API_BASE_URL}/login/`,
        { username, password },
        { withCredentials: true }
      )

    if (res.data.result === 'success') {
      if (res.data.nickname) { // 제네릭으로 응답 타입 수정
          localStorage.setItem('nickname', res.data.nickname)
        }
      navigate('/dashboard')  
    } else {
      setError('로그인 실패! 아이디/비밀번호를 확인하세요.')
    }
  } catch (err) {
    setError('로그인 실패! 아이디/비밀번호를 확인하세요.')
  }
}


  return (
    <BackgroundLayout>
      <form
        className="px-6 pt-[80px] pb-8 flex flex-col items-center"
        onSubmit={handleLogin}
      >
        <div className="pt-20 mt-20">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full mb-4 px-4 py-2 border-b border-black focus:outline-none"
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full mb-6 px-4 py-2 border-b border-black focus:outline-none text-gray-500"
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-xl mb-8"
        >
          Login
        </button>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="flex items-center justify-center pt-5 w-full mb-6">
          <div className="flex-grow h-px bg-primary" />
          <p className="mx-4 text-primary text-sm font-semibold">sign up</p>
          <div className="flex-grow h-px bg-primary" />
        </div>

        <div className="flex justify-center gap-10 mb-6 text-2xl text-black">
          <FaGoogle />
          <FaApple />
          <button
            type="button"
            onClick={() => {
              console.log('카카오 로그인 클릭')
            }}
          >
            <SiKakaotalk className="text-black text-xl" />
          </button>
        </div>

        <p className="text-sm text-center pt-5 text-gray-600">
          Forgot password?{' '}
          <span className="underline cursor-pointer text-black">Click here</span>
        </p>
      </form>
    </BackgroundLayout>
  )
}
