import { CalendarDays } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const items = [
    {
        title: "Eventos",
        url: "/eventos",
        icon: CalendarDays,
    },
];

import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AppSidebar() {
    const location = useLocation();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="border-b border-border/40 pb-4 pt-4 px-4 flex flex-row items-center justify-between group/header group-data-[collapsible=icon]:border-b-0 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:justify-center relative">
                <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
                    <img src="/votify-logo.png" alt="Logo" className="h-8 w-auto shrink-0" />
                    <h2 className="text-lg font-bold tracking-tight truncate">Votify</h2>
                </div>
                
                {/* Logo visible when collapsed, hidden on hover */}
                <div className="hidden group-data-[collapsible=icon]:flex items-center justify-center transition-opacity duration-200 group-hover/header:opacity-0">
                    <img src="/votify-logo.png" alt="Logo" className="h-6 w-6 object-contain" />
                </div>
                
                {/* Trigger: absolute overlay when collapsed, or normal position when expanded */}
                <div className="group-data-[collapsible=icon]:absolute group-data-[collapsible=icon]:inset-0 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:group-hover/header:opacity-100 transition-opacity">
                    <SidebarTrigger className="group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8" />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={location.pathname === item.url} tooltip={item.title}>
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t border-border/40 p-4 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:border-t-0">
                <Link to="/profile" className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-md transition-colors w-full group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-1">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="" />
                        <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col flex-1 text-left group-data-[collapsible=icon]:hidden">
                        <span className="text-sm font-medium">Usuario</span>
                        <span className="text-xs text-muted-foreground">Mi Perfil</span>
                    </div>
                </Link>
            </SidebarFooter>
        </Sidebar>
    );
}
