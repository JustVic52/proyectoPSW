import { Outlet } from "react-router-dom";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function Layout() {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen bg-background text-foreground w-full">
                <AppSidebar />
                <main className="flex-1 overflow-auto relative">
                    <div className="p-6">
                        <Outlet />
                    </div>
                </main>
            </div>
            <Toaster position="top-center" />
        </SidebarProvider>
    );
}
