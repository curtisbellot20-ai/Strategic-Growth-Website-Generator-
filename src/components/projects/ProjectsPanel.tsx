'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FolderOpen, Trash2, Clock, Building2 } from 'lucide-react';
import { localProjectService } from '@/lib/projects/projectService';
import { SavedProject } from '@/lib/projects/projectTypes';
import EmptyState from '@/components/ui/EmptyState';
import { WebsiteBlueprint } from '@/types/blueprint';

interface ProjectsPanelProps {
  onClose: () => void;
  onLoad: (blueprint: WebsiteBlueprint, intakeData: Record<string, unknown>) => void;
}

export default function ProjectsPanel({ onClose, onLoad }: ProjectsPanelProps) {
  const [projects, setProjects] = useState<SavedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    localProjectService.getAll().then((p) => {
      setProjects(p);
      setLoading(false);
    });
  }, []);

  async function handleDelete(id: string) {
    setDeletingId(id);
    await localProjectService.delete(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setDeletingId(null);
  }

  function handleLoad(project: SavedProject) {
    onLoad(project.blueprint, project.intakeData);
    onClose();
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-[#0F0F1A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
                <FolderOpen size={18} className="text-violet-400" />
              </div>
              <div>
                <h2 className="text-white font-semibold text-base">Saved Projects</h2>
                <p className="text-white/40 text-xs">{projects.length} project{projects.length !== 1 ? 's' : ''} saved locally</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="max-h-[60vh] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-6 h-6 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
              </div>
            ) : projects.length === 0 ? (
              <EmptyState
                icon={FolderOpen}
                title="No saved projects yet"
                description="Generate a strategy and save it to see your projects here."
              />
            ) : (
              <div className="divide-y divide-white/5">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-white/3 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <Building2 size={18} className="text-white/40" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/90 font-medium text-sm truncate">{project.name}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-white/40 text-xs capitalize">{project.industry}</span>
                        <span className="text-white/20 text-xs">•</span>
                        <span className="flex items-center gap-1 text-white/40 text-xs">
                          <Clock size={10} /> {formatDate(project.updatedAt)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleLoad(project)}
                        className="px-3 py-1.5 bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/30 text-violet-300 text-xs font-medium rounded-lg transition-colors"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        disabled={deletingId === project.id}
                        className="w-7 h-7 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 flex items-center justify-center text-red-400/60 hover:text-red-400 transition-colors disabled:opacity-50"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="px-6 py-4 border-t border-white/5 bg-white/2">
            <p className="text-white/25 text-xs text-center">
              Projects are stored locally in your browser. Cloud sync coming soon.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
