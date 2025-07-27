import BackgroundLayout from '@/components/layout/BackgroundLayout';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { SiKakaotalk } from 'react-icons/si';

export default function Login() {
  return (
    <BackgroundLayout>
      <div className="px-6 pt-[80px] pb-8 flex flex-col items-center">
        {/* 아이디/비밀번호 */}
        <div className='pt-20 mt-20'>
         
          {/* 아이디 */}
          <input type="text"
            placeholder="Username"
            className="w-full mb-4 px-4 py-2 border-b border-black focus:outline-none"
          />

          {/* 비밀번호 입력 */}
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 px-4 py-2 border-b border-black focus:outline-none text-gray-500"
          />
        </div>

        {/* 로그인 버튼 */}
        <button className="w-full bg-primary text-white py-3 rounded-xl mb-8">Login</button>

        {/* 회원가입 */}
        <div className="flex items-center justify-center pt-5 w-full mb-6">
          <div className="flex-grow h-px bg-primary" />
          <p className="mx-4 text-primary text-sm font-semibold">sign up</p>
          <div className="flex-grow h-px bg-primary" />
        </div>

        {/* 소셜 로그인 */}
        <div className="flex justify-center gap-10 mb-6 text-2xl text-black">
          {/* 일반 아이콘 */}
          <FaGoogle/>
          <FaApple/>

          {/* 카카오톡 아이콘 버튼 */}
          <button onClick={() => {
              console.log('카카오 로그인 클릭');
            }}
          >
            <SiKakaotalk className="text-black text-xl" />
          </button>
        </div>

        {/* 비밀번호 찾기 */}
        <p className="text-sm text-center pt-5 text-gray-600">
          Forgot password?{' '}
          <span className="underline cursor-pointer text-black">Click here</span>
        </p>
      </div>
    </BackgroundLayout>
  );
}
