// import React, { useContext, useEffect, useState } from 'react';
// import { Navigate, Route, Routes } from 'react-router-dom';
// import { Login } from './Login';
// import { User } from '../../types/User';
//
// type Props = {
//   children: React.ReactNode,
// };
//
// export const AuthProvider: React.FC<Props> = (props) => {
//   const { children } = props;
//
//   const [user, setUser] = useState<User | null>(null);
//
//   const userContext = useContext(AuthContext);
//
//   useEffect(() => {
//     const userInfo = localStorage.getItem('user');
//     const userStorage = userInfo ? JSON.parse(userInfo) : null;
//
//     setUser(userStorage);
//   }, [userContext?.user]);
//
//   if (!user) {
//     return (
//       <>
//
//
//         <Routes>
//
//
//           <Route path="*" element={<Navigate to="/login" replace />} />
//         </Routes>
//       </>
//     );
//   }
//
//   return (
//     <AuthContext.Provider value={userContext}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
