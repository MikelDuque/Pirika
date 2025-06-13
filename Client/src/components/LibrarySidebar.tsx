import { useNavigate } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "./ui/Sidebar";
import { LibraryPath } from "../utils/paths";
import { Library } from "lucide-react";

export default function LibrarySidebar({className}: {className?: string}) {
  const navigate = useNavigate();

  return (
    <aside className={className}>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenuButton onClick={() => navigate(LibraryPath)}>
            <Library/> Library
          </SidebarMenuButton>
        </SidebarHeader>
        <SidebarContent>
        </SidebarContent>
      </Sidebar>
    </aside>
  )
}