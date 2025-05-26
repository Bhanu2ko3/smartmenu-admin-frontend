
// 'use client';

// import { useState} from "react";
// import Link from "next/link";

// export default function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await register(email, password);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Admin Register</h2>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//               placeholder="admin@smartfood.lk"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//               placeholder="Password"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
//           >
//             Register
//           </button>
//         </form>
//         <p className="text-center mt-4">
//           Already have an account?{" "}
//           <Link href="/auth/signIn" className="text-blue-600 hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }