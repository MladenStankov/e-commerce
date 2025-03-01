import { EmailProvider } from "@/components/auth/EmailContext";

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EmailProvider>{children}</EmailProvider>;
}
