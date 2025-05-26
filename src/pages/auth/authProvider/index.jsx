// // src/pages/auth/authProvider/index.jsx

// import { createContext, useState, useEffect } from "react";
// import jwtDecode from "jwt-decode";
// import { useRouter } from "next/navigation";


// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const router = useRouter();

//   const login = async (token) => {
//     localStorage.setItem("token", token);
//     const decoded = jwtDecode(token);
//     setUser(decoded);
//     router.push("/dashboard");
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     router.push("/auth/login");
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setUser(decoded);
//       } catch {
//         logout();
//       }
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
