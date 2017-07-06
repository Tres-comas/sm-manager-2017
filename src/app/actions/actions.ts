import { Action } from 'redux';
import { Sprint, Story } from '../states/app-states';

export interface StartAction extends Action {
  stories: Story[];
  sprint: Sprint;
}

export interface StopAction extends Action {
  happinessDelta: number;
}

export interface RetroAction extends Action {
  sprint: Sprint;
}

export interface PlanningAction extends Action {

}
