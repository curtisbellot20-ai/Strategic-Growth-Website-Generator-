import type { WebsiteBlueprint } from '@/types';

export interface SavedProject {
  id: string;
  name: string;
  industry: string;
  createdAt: string;
  updatedAt: string;
  intakeData: Record<string, unknown>;
  blueprint: WebsiteBlueprint;
}

export interface CreateProjectInput {
  name: string;
  industry: string;
  intakeData: Record<string, unknown>;
  blueprint: WebsiteBlueprint;
}

export interface IProjectService {
  getAll(): Promise<SavedProject[]>;
  get(id: string): Promise<SavedProject | null>;
  create(input: CreateProjectInput): Promise<SavedProject>;
  update(id: string, updates: Partial<SavedProject>): Promise<SavedProject>;
  delete(id: string): Promise<void>;
}
