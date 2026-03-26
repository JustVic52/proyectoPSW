import axios from "axios";
import { API_URL } from "@/config/constants";

const client = axios.create({ baseURL: API_URL });

export interface Project {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
}

export interface VotingSession {
  id: string;
  categoryId: string;
  votingType: string;
  canVoteOwnProject: boolean;
  createdAt: string;
  startTime: string;
  endTime: string;
}

export interface Criterion {
  id: string;
  name: string;
  weight: number;
  type: string;
  createdAt: string;
}

export interface Scale {
  id: string;
  description: string;
}

export interface ScaleWithCriteria {
  scale: Scale;
  criteria: Criterion[];
}

export interface CategoryProject {
  id: string;
  projectId: string;
  categoryId: string;
}

export interface RankingEntry {
  projectId: string;
  titulo: string;
  score: number;
  voteCount: number;
}

export interface VotePayload {
  voterId?: string;
  projectId: string;
  votingSessionId: string;
  comment: string;
  criterionValues: { criterionId: string; numericValue: number }[];
}

export const projectsApi = {
  getAll: () => client.get<Project[]>("/api/projects"),
};

export const categoriesApi = {
  getAll: () => client.get<Category[]>("/api/categories"),
  getById: (id: string) => client.get<Category>(`/api/categories/${id}`),
  getProjects: (categoryId: string) => client.get<Project[]>(`/api/categories/${categoryId}/projects`),
  create: (name: string) => client.post<Category>("/api/categories", { name }),
  delete: (id: string) => client.delete(`/api/categories/${id}`),
};

export const votingSessionsApi = {
  getAll: () => client.get<VotingSession[]>("/api/voting-sessions"),
  getByCategory: (categoryId: string) => client.get<VotingSession[]>(`/api/voting-sessions/category/${categoryId}`),
  create: (data: Partial<VotingSession>) => client.post<VotingSession>("/api/voting-sessions", data),
  update: (id: string, data: Partial<VotingSession>) => client.put<VotingSession>(`/api/voting-sessions/${id}`, data),
};

export const scalesApi = {
  create: (data: { votingSessionId: string; description: string }) => client.post<Scale>("/api/scales", data),
  getWithCriteria: (sessionId: string) => client.get<ScaleWithCriteria[]>(`/api/scales/voting-session/${sessionId}/with-criteria`),
};

export const criteriaApi = {
  getAll: () => client.get<Criterion[]>("/api/criteria"),
  create: (data: { scaleId: string; name: string; type: string; weight: number }) => client.post<Criterion>("/api/criteria", data),
};

export const categoryProjectsApi = {
  getByProject: (projectId: string) => client.get<CategoryProject[]>(`/api/category-projects/project/${projectId}`),
};

export const rankingsApi = {
  getByCategory: (categoryId: string) => client.get<RankingEntry[]>(`/api/rankings/category/${categoryId}`),
  getGlobal: (categoryIds: string) => client.get<RankingEntry[]>(`/api/rankings/global?categoryIds=${categoryIds}`),
};

export interface AnonymousVote {
  id: string;
  projectId: string;
  votingSessionId: string;
  comment: string;
  createdAt: string;
}

export const votesApi = {
  getAll: () => client.get<AnonymousVote[]>("/api/votes"),
  submit: (payload: VotePayload) => client.post("/api/vote", payload),
};
