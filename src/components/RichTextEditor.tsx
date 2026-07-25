import { useRef } from 'react';
import { Bold, Italic } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({ value, onChange, placeholder, className = '' }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  const handleCommand = (command: string) => {
    document.execCommand(command, false);
    editorRef.current?.focus();
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className={`rounded-lg border border-forest/15 overflow-hidden ${className}`}>
      <div className="flex gap-1 px-2 py-1.5 bg-forest/5 border-b border-forest/10">
        <button type="button" onClick={() => handleCommand('bold')}
          className="p-1.5 rounded hover:bg-forest/10 text-forest/60 hover:text-forest transition-colors"
          title="Bold">
          <Bold size={14} />
        </button>
        <button type="button" onClick={() => handleCommand('italic')}
          className="p-1.5 rounded hover:bg-forest/10 text-forest/60 hover:text-forest transition-colors"
          title="Italic">
          <Italic size={14} />
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={() => {
          if (editorRef.current) onChange(editorRef.current.innerHTML);
        }}
        dangerouslySetInnerHTML={{ __html: value }}
        data-placeholder={placeholder}
        className="w-full px-4 py-3 bg-ivory text-forest font-poppins text-sm min-h-[80px] focus:outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-forest/30 [&_b]:font-bold [&_i]:italic"
        style={{ lineHeight: '1.6' }}
      />
    </div>
  );
}
