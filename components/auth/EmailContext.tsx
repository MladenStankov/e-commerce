"use client";

import { createContext, useContext, useState } from "react";

interface IEmailContext {
  email: string;
  setEmail: (email: string) => void;
}

const EmailContext = createContext<IEmailContext | undefined>(undefined);

export function EmailProvider({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState<string>("");

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
}

export function useEmail() {
  const context = useContext(EmailContext);
  if (context === undefined) {
    throw new Error("useEmail must be used within a EmailProvider");
  }
  return context;
}
