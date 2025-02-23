import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Profile from "./Profile";
import ProjectList from "./ProjectList";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      <Button
        variant="ghost"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={toggleMobile}
      >
        {isMobileOpen ? <X /> : <Menu />}
      </Button>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
          expanded ? "w-64" : "w-20",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between p-4">
          <Link href="/">
            <div className={cn("transition-all", expanded ? "block" : "hidden")}>
              <h1 className="font-semibold text-xl text-sidebar-foreground">TURTLE</h1>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={toggleSidebar}
          >
            {expanded ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        <Profile expanded={expanded} />
        
        <ScrollArea className="flex-1 px-4">
          <ProjectList expanded={expanded} />
        </ScrollArea>
      </aside>
    </>
  );
}
