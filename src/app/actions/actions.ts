import { Action } from 'redux';
import { Sprint, Story, WorkState } from '../states/app-states';

export interface WorkStateAction extends Action {
  newWorkState: WorkState;
}

export interface TeamStatChangeAction extends Action {
  velocityDelta: number;
  happinessDelta: number;
}

export interface StartAction extends Action {
  stories: Story[];
  sprint: Sprint;
}

export interface CloseSprintAction extends Action {
  sprint: Sprint;
  deliveredPoints: number;
}
