import SideNavigation from "@/components/admin/SideNavigation";
import Footer from "@/components/Footer";
import Navigation from "@/components/navigation/Navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main className="flex">
        <SideNavigation />
        <div className="ml-64 w-full pt-5 max-md:ml-0 min-h-svh h-full flex flex-col gap-6">
          {children}
          <div className="mt-auto">
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}
