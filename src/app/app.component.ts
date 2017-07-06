import {Component, Inject} from '@angular/core';
import {AppStore} from 'angular2-redux';
import {SprintState, WorkState} from './states/app-states';
import {RetroAction, StartAction, StopAction} from './actions/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(@Inject(AppStore) private appStore: AppStore) {}

  startSprint() {
    const sprint = {
      stories: [],
      state: SprintState.Open,
      deliveredPoints: 0
    };

    const stories = [
      {
        title: 'First',
        estimate: 3
      }
    ];

    this.appStore.dispatch({
      type: 'START_SPRINT',
      sprint,
      stories
    } as StartAction );

    setTimeout(() => {
      this.finishSprint();
    }, 2000);
  }

  finishSprint() {
    const happinessDelta = Math.random() * 2 - 1;
    this.appStore.dispatch({
      type: 'FINISH_SPRINT',
      happinessDelta
    } as StopAction );
  }

  goToRetro() {
    this.appStore.dispatch({
      type: 'RETROSPECT'
    } as RetroAction )
  }

  isPlanningState() {
    return this.appStore.getState().reducer.workState === WorkState.Planning;
  }

  isWorkingState() {
    return this.appStore.getState().reducer.workState === WorkState.Working;
  }

  isClosingState() {
    return this.appStore.getState().reducer.workState === WorkState.Closing;
  }

  isRetroState() {
    return this.appStore.getState().reducer.workState === WorkState.Retro;
  }
}

