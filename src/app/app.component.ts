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
  constructor(@Inject(AppStore) public appStore: AppStore) {}

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

