import { Component, Inject } from '@angular/core';
import { AppStore } from 'angular2-redux';
import { WorkState } from './states/app-states';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(@Inject(AppStore) public appStore: AppStore) {}

  isPlanningState() {
    return this.appStore.getState().WorkStateReducer.workState === WorkState.Planning;
  }

  isWorkingState() {
    return this.appStore.getState().WorkStateReducer.workState === WorkState.Working;
  }

  isClosingState() {
    return this.appStore.getState().WorkStateReducer.workState === WorkState.Closing;
  }

  isRetroState() {
    return this.appStore.getState().WorkStateReducer.workState === WorkState.Retro;
  }
}

