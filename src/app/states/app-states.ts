export interface AppState {
  stories: Story[];
  sprints: Sprint[];
}

export interface TeamStatState {
  velocity: number;
  happiness: number;
}

export interface AppWorkState {
  workState: WorkState;
}

export interface Story {
  title: string;
  estimate: number;
  workflow: WorkFlow;
}

export interface Sprint {
  stories: Story[];
  state: SprintState;
  deliveredPoints: number;
}

export enum WorkFlow {
  Open,
  InProgress,
  Successful
}

export enum SprintState {
  Open,
  Started,
  Finished
}

export enum WorkState {
  Planning,
  Working,
  Closing,
  Retro
}

export const initialState: AppState = {
  stories: [],
  sprints: []
};

export const initialTeamStatState: TeamStatState = {
  velocity: Math.floor(Math.random() * 6) + 10,
  happiness: Math.floor(Math.random() * 4) + 1
};

export const initialWorkState: AppWorkState = {
  workState: WorkState.Planning
};
