import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'yaml', title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#0f172a] my-4 shadow-md">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1e293b] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block"></span>
          </div>
          <span className="text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider ml-2">
            {title || language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg transition-colors border border-slate-700 font-medium"
          title="Copy to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-slate-200">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                <td className="pr-4 select-none text-right text-slate-600 text-xs w-8 align-top">
                  {idx + 1}
                </td>
                <td className="whitespace-pre text-slate-200">
                  {line.startsWith('#') || line.startsWith('//') ? (
                    <span className="text-slate-500 italic">{line}</span>
                  ) : line.includes(':') && language === 'yaml' ? (
                    <span>
                      <span className="text-cyan-300 font-medium">{line.split(':')[0]}:</span>
                      <span className="text-emerald-300">{line.slice(line.indexOf(':') + 1)}</span>
                    </span>
                  ) : (
                    line
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
