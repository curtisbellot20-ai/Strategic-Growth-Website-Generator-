'use client';
import { useState, useRef, KeyboardEvent } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  addOnBlur?: boolean;
}

export default function TagInput({
  value = [],
  onChange,
  placeholder = 'Type and press Enter…',
  maxTags,
  addOnBlur = true,
}: TagInputProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed || value.includes(trimmed)) { setInput(''); return; }
    if (maxTags && value.length >= maxTags) return;
    onChange([...value, trimmed]);
    setInput('');
  };

  const removeTag = (i: number) => onChange(value.filter((_, idx) => idx !== i));

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(input); }
    else if (e.key === 'Backspace' && !input && value.length) removeTag(value.length - 1);
  };

  const canAdd = !maxTags || value.length < maxTags;

  return (
    <div
      className="input min-h-[52px] flex flex-wrap items-center gap-2 cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {value.map((tag, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1 bg-sky-500/20 border border-sky-500/30 text-sky-300 text-sm rounded-lg flex-shrink-0"
        >
          {tag}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); removeTag(i); }}
            className="hover:text-white transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      {canAdd && (
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addOnBlur && addTag(input)}
          placeholder={value.length === 0 ? placeholder : '+ add more'}
          className="flex-1 min-w-[140px] bg-transparent outline-none text-gray-100 placeholder-gray-500 text-sm py-0.5"
        />
      )}
    </div>
  );
}
