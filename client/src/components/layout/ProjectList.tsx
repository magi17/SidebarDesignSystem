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
        { name: "Gpt4o", path: "/gpt4o" },
        { name: "llama", path: "/llama" },
        { name: "Gemini 1.5 vision", path: "/api/gemini?ask=hi" },
        { name: "Gemini-2.0-pro-exp-02-0", path: "/gemini-pro" },
        { name: "Mistral", path: "/mistral" },
      ]
    },
    {
      name: "API",
      items: [
        { name: "Shoti api", path: "/shoti-api" },
        { name: "Shoti website", path: "/shoti-website" },
      ]
    }
  ];

  if (!expanded) {
    return (
      <nav className="space-y-2">
        {projects.flatMap(category => 
          category.items.map(item => (
            <Link 
              key={item.path}
              href={item.path}
              className="flex items-center justify-center h-10 w-10 rounded-md hover:bg-gray-800 transition-colors"
            >
              <span className="w-4 h-4 bg-gray-700 rounded-full" />
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
          <AccordionTrigger className="text-white hover:text-gray-300">
            {category.name}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-1">
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