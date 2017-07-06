import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppStore, createAppStoreFactoryWithOptions } from 'angular2-redux';
import {AppState, initialState, Sprint, SprintState, WorkState} from './states/app-states';
import { Action, Reducer } from 'redux';
import { StartAction, StopAction } from './actions/actions';
import { PlanningViewComponent } from './planning-view/planning-view.component';

function clamp(a, b, c) {
  return Math.max(b, Math.min(c, a));
}

export const reducer: Reducer<AppState> =
  (state: AppState = initialState, action: Action): AppState => {
    const newState: AppState = Object.assign({}, state);
    switch (action.type) {
      case 'START_SPRINT':
        const sprint: Sprint = (<StartAction>action).sprint;
        sprint.stories = (<StartAction>action).stories;
        sprint.state = SprintState.Started;
        newState.sprints.push(sprint);
        newState.workState = WorkState.Working;
        return newState;
      case 'FINISH_SPRINT':
        newState.happiness += (<StopAction>action).happinessDelta;
        newState.workState = WorkState.Closing;
        newState.happiness = clamp(5, 1, newState.happiness);
        return newState;
      case 'RETROSPECT':
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
  });
}

@NgModule({
  declarations: [
    AppComponent,
    PlanningViewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [{provide: AppStore, useFactory: appStoreFactory()}],
  bootstrap: [AppComponent]
})

export class AppModule { }
