import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CodeEditor } from "@/components/CodeEditor";
import { useState } from "react";
import { toast } from "sonner";
import { RainbowButton } from "@/components/ui/rainbow-button";
import {
  Copy,
  ArrowLeftRight,
  Code,
  BookOpen,
  Sparkles,
  FileText,
  Award,
  Star,
} from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { convertCode } from "@/utils/codeConverter";

const Index = () => {
  const [sourceCode, setSourceCode] = useState("");
  const [targetCode, setTargetCode] = useState("");
  const [sourceLang, setSourceLang] = useState("javascript");
  const [targetLang, setTargetLang] = useState("python");

  const handleConvert = async () => {
    if (!sourceCode) {
      toast.error("Please enter some code to convert");
      return;
    }

    if (!localStorage.getItem("GEMINI_API_KEY")) {
      toast.error("Please enter your Gemini API key in the settings");
      return;
    }

    try {
      toast.loading("Converting code...");
      const convertedCode = await convertCode(
        sourceCode,
        sourceLang,
        targetLang
      );
      setTargetCode(convertedCode);
      toast.dismiss();
      toast.success("Code converted successfully!");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to convert code. Please try again.");
    }
  };

  const handleCopyCode = async (code: string, type: "source" | "target") => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success(
        `${type === "source" ? "Source" : "Target"} code copied to clipboard!`
      );
    } catch (err) {
      toast.error("Failed to copy code");
    }
  };

  const handleSwitchCode = () => {
    const tempCode = sourceCode;
    const tempLang = sourceLang;
    setSourceCode(targetCode);
    setTargetCode(tempCode);
    setSourceLang(targetLang);
    setTargetLang(tempLang);
    toast.success("Code switched successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-3xl">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">
            Sin<span className="text-green-500">X</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your code between different programming languages with
            ease. Our intelligent system helps you convert code while
            maintaining its functionality.
          </p>
        </motion.div>

        <Tabs defaultValue="editor" className="mb-12">
          <TabsList className="grid w-full grid-cols-3 max-w-[400px] mx-auto bg-background/50 backdrop-blur-sm">
            <TabsTrigger
              value="editor"
              className="data-[state=active]:from-primary/20"
            >
              Editor
            </TabsTrigger>
            <TabsTrigger
              value="features"
              className="data-[state=active]:from-primary/20"
            >
              Features
            </TabsTrigger>
            <TabsTrigger
              value="docs"
              className="data-[state=active]:from-primary/20"
            >
              Documentation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="editor">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid md:grid-cols-2 gap-8 relative"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Source Code</h2>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCopyCode(sourceCode, "source")}
                      disabled={!sourceCode}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Select value={sourceLang} onValueChange={setSourceLang}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="cpp">C++</SelectItem>
                        <SelectItem value="typescript">TypeScript</SelectItem>
                        <SelectItem value="ruby">Ruby</SelectItem>
                        <SelectItem value="php">PHP</SelectItem>
                        <SelectItem value="csharp">C#</SelectItem>
                        <SelectItem value="go">Go</SelectItem>
                        <SelectItem value="swift">Swift</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <CodeEditor
                  value={sourceCode}
                  onChange={setSourceCode}
                  language={sourceLang}
                />
              </div>

              <Button
                variant="outline"
                size="icon"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex p-2 bg-transparent border-none shadow-none hover:bg-transparent focus:outline-none"
                onClick={handleSwitchCode}
              >
                <ArrowLeftRight className="h-4 w-4" />
              </Button>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Target Code</h2>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCopyCode(targetCode, "target")}
                      disabled={!targetCode}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Select value={targetLang} onValueChange={setTargetLang}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="cpp">C++</SelectItem>
                        <SelectItem value="typescript">TypeScript</SelectItem>
                        <SelectItem value="ruby">Ruby</SelectItem>
                        <SelectItem value="php">PHP</SelectItem>
                        <SelectItem value="csharp">C#</SelectItem>
                        <SelectItem value="go">Go</SelectItem>
                        <SelectItem value="swift">Swift</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <CodeEditor
                  value={targetCode}
                  onChange={setTargetCode}
                  language={targetLang}
                  readOnly
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center mt-8"
            >
              <RainbowButton onClick={handleConvert}>
                Transform Code
              </RainbowButton>
            </motion.div>
          </TabsContent>

          <TabsContent value="features">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: Code,
                  title: "Multiple Languages",
                  description:
                    "Support for various programming languages including JavaScript, Python, Java, and C++, etc.",
                },
                {
                  icon: Sparkles,
                  title: "Intelligent Conversion",
                  description:
                    "Smart code transformation that maintains functionality and readability",
                },
                {
                  icon: BookOpen,
                  title: "Documentation",
                  description:
                    "Comprehensive documentation and examples for each language",
                },
                {
                  icon: Copy,
                  title: "Quick Copy",
                  description:
                    "Easily copy source or converted code with a single click",
                },
                {
                  icon: ArrowLeftRight,
                  title: "Code Switching",
                  description:
                    "Instantly switch between source and target code with preserved formatting",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-card/50 border-none">
                    <CardHeader>
                      <feature.icon className="w-8 h-8 mb-2 group-hover:text-primary transition-colors" />
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {feature.title}
                      </CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="docs">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="space-y-8">
                <section className="bg-card rounded-lg p-6 shadow-lg border border-border/50">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">Getting Started</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Welcome to SinX. This tool helps you convert code between
                    different programming languages while maintaining its
                    functionality and structure.
                  </p>
                </section>

                <section className="bg-card rounded-lg p-6 shadow-lg border border-border/50">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-semibold">How to Use</h3>
                  </div>
                  <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
                    <li className="pl-2">
                      Select your source programming language from the dropdown
                      menu
                    </li>
                    <li className="pl-2">
                      Paste or type your code in the source code editor
                    </li>
                    <li className="pl-2">
                      Choose your target programming language
                    </li>
                    <li className="pl-2">
                      Click the "Transform Code" button to convert your code
                    </li>
                    <li className="pl-2">
                      Copy the transformed code using the copy button
                    </li>
                  </ol>
                </section>

                <section className="bg-card rounded-lg p-6 shadow-lg border border-border/50">
                  <div className="flex items-center gap-2 mb-4">
                    <Code className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-semibold">
                      Supported Languages
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: "JavaScript", version: "ES6+" },
                      { name: "Python", version: "3.x" },
                      { name: "Java", version: "11+" },
                      { name: "C++", version: "17+" },
                      { name: "TypeScript", version: "4.x" },
                      { name: "Ruby", version: "2.7+" },
                      { name: "PHP", version: "8.x" },
                      { name: "C#", version: "10.0" },
                      { name: "Go", version: "1.17+" },
                      { name: "Swift", version: "5.x" },
                    ].map((lang) => (
                      <div
                        key={lang.name}
                        className="flex items-center gap-2 p-3 rounded-md bg-accent/50"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="font-medium">{lang.name}</span>
                        <span className="text-sm text-muted-foreground">
                          ({lang.version})
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="bg-card rounded-lg p-6 shadow-lg border border-border/50">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-semibold">Best Practices</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Ensure your source code is syntactically correct",
                      "Use clear and consistent naming conventions",
                      "Break down complex functions into smaller, manageable pieces",
                      "Include comments to explain complex logic",
                    ].map((practice, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-2 text-muted-foreground"
                      >
                        <Star className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                        <span>{practice}</span>
                      </motion.li>
                    ))}
                  </ul>
                </section>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
