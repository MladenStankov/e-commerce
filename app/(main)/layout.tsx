import Footer from "@/components/Footer";
import Navigation from "@/components/navigation/Navigation";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navigation />
      <main className="min-h-svh">{children}</main>
      <Footer />
    </>
  );
}
