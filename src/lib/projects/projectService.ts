import { SavedProject, CreateProjectInput, IProjectService } from './projectTypes';

const STORAGE_KEY = 'sgwg_projects';

function load(): SavedProject[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function save(projects: SavedProject[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export const localProjectService: IProjectService = {
  async getAll() {
    return load();
  },

  async get(id) {
    return load().find((p) => p.id === id) ?? null;
  },

  async create(input: CreateProjectInput) {
    const projects = load();
    const project: SavedProject = {
      id: `proj_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name: input.name,
      industry: input.industry,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      intakeData: input.intakeData,
      blueprint: input.blueprint,
    };
    projects.unshift(project);
    save(projects);
    return project;
  },

  async update(id, updates) {
    const projects = load();
    const idx = projects.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error(`Project ${id} not found`);
    projects[idx] = { ...projects[idx], ...updates, updatedAt: new Date().toISOString() };
    save(projects);
    return projects[idx];
  },

  async delete(id) {
    const projects = load().filter((p) => p.id !== id);
    save(projects);
  },
};
