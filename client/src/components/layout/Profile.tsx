import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaGithub, FaFacebook, FaInstagram } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface ProfileProps {
  expanded: boolean;
}

export default function Profile({ expanded }: ProfileProps) {
  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <Avatar className="h-20 w-20 bg-gray-700">
        <AvatarImage src="/turtle-logo.png" alt="Turtle Logo" />
        <AvatarFallback>TURTLE</AvatarFallback>
      </Avatar>

      {expanded && (
        <>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white">Mark Martinez</h2>
            <p className="text-sm text-gray-400">
              CHATGPT CODING,
              <br />
              ALL MY CODE IS MADE BY CHATGPT
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </>
      )}
    </div>
  );
}