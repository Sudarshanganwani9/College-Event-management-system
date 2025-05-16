
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated } = useAuth();
  
  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-[calc(100vh-132px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-college-textDark">
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </h1>
          <p className="mt-2 text-gray-600">
            {isLogin
              ? "Welcome back to College Events"
              : "Join College Events to register for campus activities"}
          </p>
        </div>
        
        {isLogin ? (
          <LoginForm onToggleForm={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onToggleForm={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
}
