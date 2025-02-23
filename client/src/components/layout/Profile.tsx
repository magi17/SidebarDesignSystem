import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaGithub, FaFacebook, FaInstagram } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface ProfileProps {
  expanded: boolean;
}

export default function Profile({ expanded }: ProfileProps) {
  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src="https://avatars.githubusercontent.com/u/124599" />
        <AvatarFallback>MM</AvatarFallback>
      </Avatar>

      <div className={cn("text-center", expanded ? "block" : "hidden")}>
        <h2 className="text-xl font-semibold text-sidebar-foreground">Mark Martinez</h2>
        <p className="text-sm text-sidebar-foreground/60">
          CHATGPT CODING,
          <br />
          ALL MY CODE IS MADE BY CHATGPT
        </p>
      </div>

      <div className={cn("flex gap-4", expanded ? "block" : "hidden")}>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sidebar-foreground/60 hover:text-sidebar-foreground"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sidebar-foreground/60 hover:text-sidebar-foreground"
        >
          <FaFacebook size={24} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer" 
          className="text-sidebar-foreground/60 hover:text-sidebar-foreground"
        >
          <FaInstagram size={24} />
        </a>
      </div>
    </div>
  );
}
