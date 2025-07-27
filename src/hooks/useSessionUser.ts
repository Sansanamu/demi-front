// import { useEffect, useState } from 'react';

// // export default function useSessionUser() {
// //   const [user, setUser] = useState<{ user_id: string; nickname: string } | null>(null);

// //   useEffect(() => {
// //     fetch('http://localhost:8000/api/session-user/', {
// //       credentials: 'include', // 세션 쿠키 포함
// //     })
// //       .then(res => res.json())
// //       .then(data => setUser(data))
// //       .catch(err => console.error('유저 세션 정보 불러오기 실패:', err));
// //   }, []);

// //   return user;
// // }

export default function useSessionUser() {
  // 더미 유저 정보
  const user = {
    user_id: 'judy123',
    username: '주디',
  };

  return user;
}
