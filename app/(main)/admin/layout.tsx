import SideNavigation from "@/components/admin/SideNavigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex">
      <SideNavigation />
      <div className="ml-64 w-full p-5 max-md:ml-0">{children}</div>
    </main>
  );
}
