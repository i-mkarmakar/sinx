import { Textarea } from "@/components/ui/textarea";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  readOnly?: boolean;
}

export const CodeEditor = ({
  value,
  onChange,
  language,
  readOnly = false,
}: CodeEditorProps) => {
  return (
    <div className="rounded-md border overflow-hidden bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-lg">
      <div className="px-4 py-2 border-b bg-muted/50 backdrop-blur-sm flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80 backdrop-blur-sm" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 backdrop-blur-sm" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 backdrop-blur-sm" />
        </div>
        <span className="text-sm text-muted-foreground font-mono">
          {language}
        </span>
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[400px] font-mono border-0 resize-none focus-visible:ring-0 bg-transparent text-foreground placeholder:text-muted-foreground/50"
        placeholder={`Enter ${language} code here...`}
        readOnly={readOnly}
        spellCheck={false}
      />
    </div>
  );
};
