import { useState, useEffect } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { toast } from "sonner";
import { Eye, EyeOff, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem("GEMINI_API_KEY");
    if (savedKey) setApiKey(savedKey);
  }, []);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter an API key");
      return;
    }
    localStorage.setItem("GEMINI_API_KEY", apiKey);
    toast.success("API key saved successfully!", {
      position: "top-center",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-2 font-bold">
            <Logo />
          </a>
        </div>

        <div className="flex items-center ml-auto gap-4">
          <div className="hidden md:flex items-center gap-2">
            <div className="relative flex items-center">
              <Input
                type={showApiKey ? "text" : "password"}
                placeholder="Enter Gemini API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-[240px] pr-10"
              />
              <Button
                variant="ghost"
                size="icon"
                type="button"
                className="absolute right-0"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={handleSaveApiKey}
              className="shrink-0"
            >
              Save
            </Button>
          </div>

          <div className="flex items-center">
            <ModeToggle />

            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-accent"
                  >
                    <Menu className="h-5 w-5 ml-auto -mr-2" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[280px] sm:w-[340px] p-0 bg-gradient-to-b from-background to-background/95 backdrop-blur-xl border-l border-border/50"
                >
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col h-full"
                    >
                      <SheetTitle asChild>
                        <VisuallyHidden>
                          <h2>Mobile Settings</h2>
                        </VisuallyHidden>
                      </SheetTitle>

                      <motion.div
                        className="p-6 border-b border-border/50"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <h2 className="text-lg font-semibold mb-1">Settings</h2>
                      </motion.div>

                      <motion.div
                        className="flex-1 p-6 space-y-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Gemini API Key
                          </label>
                          <div className="relative">
                            <Input
                              type={showApiKey ? "text" : "password"}
                              placeholder="Enter your API key"
                              value={apiKey}
                              onChange={(e) => setApiKey(e.target.value)}
                              className="pr-10 mb-4 bg-background/50 backdrop-blur border-border/50"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              type="button"
                              className="absolute right-0 top-0"
                              onClick={() => setShowApiKey(!showApiKey)}
                            >
                              {showApiKey ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <Button
                            onClick={handleSaveApiKey}
                            className="w-full mt-5"
                          >
                            Save API Key
                          </Button>
                        </div>
                      </motion.div>

                      <motion.div
                        className="p-6 border-t border-border/50 bg-muted/50"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <p className="text-xs text-muted-foreground text-center">
                          Get your API key from the Gemini dashboard
                        </p>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
