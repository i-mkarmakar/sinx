import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t py-6">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Copyright &copy; {new Date().getFullYear()}{" "}
          <a href="/">
            Sin<span className="text-green-500">X</span>
          </a>{" "}
          | All rights reserved.
        </div>
        <Button variant="ghost" size="icon" asChild>
          <a
            href="https://github.com/its-mkarmakar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
        </Button>
      </div>
    </footer>
  );
};
