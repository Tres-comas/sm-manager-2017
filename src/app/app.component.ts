import { Component, Inject } from '@angular/core';
import { AppStore } from 'angular2-redux';
import { SprintState, WorkState } from './states/app-states';
import { RetroAction } from './actions/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(@Inject(AppStore) private appStore: AppStore) {}

  goToRetro() {
    const sprint = {
      stories: [],
      state: SprintState.Finished,
      deliveredPoints: this._getStories().map(item => item.estimate)[0]
    };

    this.appStore.dispatch({
      type: 'RETROSPECT',
      sprint
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

  private _getStories() {
    const stories = [
      {
        title: 'First',
        estimate: 3
      }
    ];

    return stories;
  }
}

