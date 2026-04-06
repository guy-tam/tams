"use client";

// רכיב הגנה על מסלולים - מפנה משתמשים לא מאומתים לדף ההתחברות
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // הפניה לדף ההתחברות אם המשתמש לא מאומת
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  // מצב טעינה - ספינר עם מיתוג TAMS
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" as const }}
          className="flex flex-col items-center gap-6"
        >
          {/* לוגו TAMS */}
          <div className="size-14 rounded-xl bg-gradient-to-br from-tams-blue to-tams-cyan flex items-center justify-center">
            <span className="text-white font-bold text-2xl">T</span>
          </div>

          {/* ספינר */}
          <motion.div
            className="size-8 rounded-full border-2 border-white/10 border-t-tams-blue"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear" as const,
            }}
          />

          <p className="text-sm text-muted-foreground">Loading...</p>
        </motion.div>
      </div>
    );
  }

  // אם לא מאומת, לא מציגים תוכן (ההפניה תתרחש ב-useEffect)
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
