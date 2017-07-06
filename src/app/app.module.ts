import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppStore, createAppStoreFactoryWithOptions } from 'angular2-redux';
import {AppState, initialState, Sprint, SprintState, WorkState} from './states/app-states';
import { Action, Reducer } from 'redux';
import { PlanningViewComponent } from './planning-view/planning-view.component';
import { RetroAction, StartAction, StopAction } from './actions/actions';

let sprint: Sprint;

function clamp(a, b, c) {
  return Math.max(b, Math.min(c, a));
}

export const reducer: Reducer<AppState> =
  (state: AppState = initialState, action: Action): AppState => {
    const newState: AppState = Object.assign({}, state);
    switch (action.type) {
      case 'START_SPRINT':
        this.sprint = (<StartAction>action).sprint;
        this.sprint.stories = (<StartAction>action).stories;
        this.sprint.state = SprintState.Started;
        newState.sprints.push(this.sprint);
        newState.workState = WorkState.Working;
        return newState;
      case 'FINISH_SPRINT':
        newState.happiness += (<StopAction>action).happinessDelta;
        newState.workState = WorkState.Closing;
        newState.happiness = clamp(5, 1, newState.happiness);
        return newState;
      case 'RETROSPECT':
        this.sprint = (<RetroAction>action).sprint;
        newState.workState = WorkState.Retro;
        return newState;
      default:
        return initialState;
    }
};

// my logger middleware
export const loggerMiddleware = store => next => action => {
  console.log('dispatching', action);
  return next(action);
};

// create app store factory
export function appStoreFactory() {
  return createAppStoreFactoryWithOptions({
    reducers: { reducer },
    additionalMiddlewares: [loggerMiddleware],
    debug: true // accepts a function as well
  })();
}

@NgModule({
  declarations: [
    AppComponent,
    PlanningViewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [{provide: AppStore, useFactory: appStoreFactory}],
  bootstrap: [AppComponent]
})

export class AppModule { }
