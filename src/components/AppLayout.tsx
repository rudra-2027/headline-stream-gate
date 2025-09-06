import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

export const AppLayout = ({ children, onLogout }: AppLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 h-14 bg-card/50 backdrop-blur-glass border-b border-border/50 z-50 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="hover:bg-accent/50" />
            <h1 className="font-semibold text-card-foreground">Static Stream Gateway</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>John Doe</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </header>

        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <main className="flex-1 pt-14">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};