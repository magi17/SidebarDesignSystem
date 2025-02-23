import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

interface ProjectListProps {
  expanded: boolean;
}

export default function ProjectList({ expanded }: ProjectListProps) {
  const projects = [
    {
      name: "Projects",
      items: [
        { name: "Gemini Vision", path: "/api/gemini" },
        { name: "Mistral Chat", path: "/api/mistral" },
        { name: "Hello API", path: "/api/hello" }
      ]
    },
    {
      name: "Quick Links",
      items: [
        { name: "Recent Activity", path: "/" },
        { name: "Settings", path: "/settings" },
      ]
    }
  ];

  if (!expanded) {
    return (
      <nav className="flex flex-col space-y-2 py-2">
        {projects.flatMap(category => 
          category.items.map(item => (
            <Link 
              key={item.path}
              href={item.path}
              className="flex items-center justify-center h-10 w-10 rounded-md hover:bg-gray-800 transition-colors"
            >
              <span className="w-2 h-2 bg-gray-500 rounded-full" />
            </Link>
          ))
        )}
      </nav>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {projects.map((category, idx) => (
        <AccordionItem key={idx} value={`item-${idx}`} className="border-gray-800">
          <AccordionTrigger className="text-white hover:text-gray-300 py-3">
            {category.name}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-1 py-2">
              {category.items.map((item, itemIdx) => (
                <Link
                  key={itemIdx}
                  href={item.path}
                  className={cn(
                    "px-4 py-2 rounded-md text-gray-400",
                    "hover:text-white hover:bg-gray-800",
                    "transition-colors"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}