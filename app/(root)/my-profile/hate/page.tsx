// "use client";

// import BookList from "@/components/BookList";
// import { Button } from "@/components/ui/button";
// import { LoadingSpinner, LoadingPage } from "@/components/LoadingSpinner";
// import { sampleBooks } from "@/constants";
// import { useAuth } from "@/contexts/AuthContext";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";

// export default function MyProfile() {
//   const { user, isAuthenticated, loading, logout } = useAuth();
//   const router = useRouter();
//   const [isLoggingOut, setIsLoggingOut] = useState(false);

//   useEffect(() => {
//     if (!loading && !isAuthenticated) {
//       router.push(`/sign-in`);
//     }
//   }, [isAuthenticated, loading, router]);

//   const handleLogout = async () => {
//     setIsLoggingOut(true);
//     try {
//       await logout();
//       toast.success("Logged out successfully", {
//         style: { backgroundColor: "green", color: "#fff" },
//       });
//     } catch (error) {
//       toast.error("Logout failed", {
//         style: { backgroundColor: "red", color: "#fff" },
//       });
//     } finally {
//       setIsLoggingOut(false);
//     }
//   };

//   if (loading) {
//     return <LoadingPage text="Loading your profile..." />;
//   }

//   if (!isAuthenticated) {
//     return (
//       <div className="flex flex-col items-center justify-center  gap-4">
//         <LoadingSpinner
//           size="lg"
//           className="text-white"
//           text="Redirecting to login..."
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-6 bg-gray-900 min-h-screen text-white">
//       <div className="mb-10">
//         <Button
//           onClick={handleLogout}
//           variant="destructive"
//           className="w-full sm:w-auto"
//           disabled={isLoggingOut}
//         >
//           {isLoggingOut ? (
//             <div className="flex items-center gap-2">
//               <LoadingSpinner size="sm" className="text-white" />
//               <span>Logging out...</span>
//             </div>
//           ) : (
//             "Logout"
//           )}
//         </Button>
//       </div>

//       <div className="mb-10">
//         <h1 className="text-2xl font-bold mb-4">My Profile</h1>
//         <div className="space-y-4 bg-gray-800 p-6 rounded-lg shadow">
//           <div>
//             <h2 className="text-lg font-semibold">Name</h2>
//             <p className="text-gray-300">{user?.name || "Not provided"}</p>
//           </div>
//           <div>
//             <h2 className="text-lg font-semibold">Email</h2>
//             <p className="text-gray-300">{user?.email || "Not provided"}</p>
//           </div>
//           <div>
//             <h2 className="text-lg font-semibold">Role</h2>
//             <p className="text-gray-300">{user?.role || "Not provided"}</p>
//           </div>
//         </div>
//       </div>

//       <div>
//         <h2 className="text-xl font-bold mb-4">Borrowed Books</h2>
//         <BookList
//           title="Borrowed Books"
//           books={sampleBooks}
//           containerClassName="bg-gray-800 p-6 rounded-lg shadow"
//         />
//       </div>
//     </div>
//   );
// }
// //
