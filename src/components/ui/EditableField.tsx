'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Pencil, Check, X } from 'lucide-react';

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
}

export default function EditableField({
  value,
  onSave,
  multiline = false,
  placeholder = 'Click to edit',
  className = '',
  labelClassName = '',
}: EditableFieldProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  function handleEdit() {
    setDraft(value);
    setEditing(true);
  }

  function handleSave() {
    onSave(draft);
    setEditing(false);
  }

  function handleCancel() {
    setDraft(value);
    setEditing(false);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !multiline) handleSave();
    if (e.key === 'Escape') handleCancel();
  }

  if (editing) {
    const sharedProps = {
      ref: inputRef as React.RefObject<HTMLInputElement & HTMLTextAreaElement>,
      value: draft,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDraft(e.target.value),
      onKeyDown: handleKey,
      placeholder,
      className: `w-full bg-white/5 border border-violet-500/40 rounded-lg px-3 py-2 text-sm text-white/90 focus:outline-none focus:border-violet-400 resize-none ${className}`,
    };

    return (
      <div className="flex flex-col gap-2">
        {multiline ? (
          <textarea {...sharedProps} rows={4} />
        ) : (
          <input {...sharedProps} type="text" />
        )}
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium rounded-lg transition-colors"
          >
            <Check size={12} /> Save
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white/70 text-xs font-medium rounded-lg transition-colors"
          >
            <X size={12} /> Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleEdit}
      className={`group flex items-start gap-2 text-left w-full rounded-lg hover:bg-white/5 px-2 py-1.5 -mx-2 -my-1.5 transition-colors ${labelClassName}`}
    >
      <span className={`flex-1 ${value ? 'text-white/90' : 'text-white/30 italic'} ${className}`}>
        {value || placeholder}
      </span>
      <Pencil size={13} className="mt-0.5 text-white/20 group-hover:text-violet-400 shrink-0 transition-colors" />
    </button>
  );
}
