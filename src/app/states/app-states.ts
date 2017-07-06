export interface AppState {
  velocity: number;
  happiness: number;
  stories: Story[];
  sprints: Sprint[];
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
  Successful,
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
  velocity: Math.floor(Math.random() * 6) + 10,
  happiness: Math.floor(Math.random() * 4) + 1,
  stories: [],
  sprints: [],
  workState: WorkState.Planning
};
