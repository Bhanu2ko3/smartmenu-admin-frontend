

export default function ProtectedRoute() {
  return <div>ProtectedRoute Page</div>;
}






// 'use client';

// import { useContext, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { AuthContext } from "../authProvider";

// export default function ProtectedRoute({ children }) {
//   const { user } = useContext(AuthContext);
//   const router = useRouter();

//   useEffect(() => {
//     if (!user) {
//       router.push("/login");
//     }
//   }, [user, router]);

//   if (!user) {
//     return null;
//   }

//   return children;
// }