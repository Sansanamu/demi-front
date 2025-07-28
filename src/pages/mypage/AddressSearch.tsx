// import { useEffect } from 'react'

// declare global {
//   interface Window {
//     daum: any
//   }
// }

// export default function AddressSearch() {
//   useEffect(() => {
//     new window.daum.Postcode({
//       oncomplete: function (data: any) {
//         console.log(data) // 선택한 주소 결과
//         // 여기서 결과를 상위 컴포넌트나 서버로 넘기도록 구성
//       },
//     }).open()
//   }, [])

//   return (
//     <div className="p-4">
//       <p className="text-lg font-bold">주소 검색 중...</p>
//     </div>
//   )
// }
