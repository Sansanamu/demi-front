export default function useSessionUser() {
  // localStorage에서 user_id와 nickname 읽어오기
  const user_id = localStorage.getItem('user_id') || '';
  const nickname = localStorage.getItem('nickname') || '회원';

  return {
    user_id,
    nickname,
  };
}
