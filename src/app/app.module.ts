import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppStore, createAppStoreFactoryWithOptions } from 'angular2-redux';
import { AppState, AppWorkState, initialState, SprintState,
  initialWorkState, TeamStatState, initialTeamStatState } from './states/app-states';
import { Action, Reducer } from 'redux';
import { PlanningViewComponent } from './planning-view/planning-view.component';
import { StartAction, TeamStatChangeAction, WorkStateAction } from './actions/actions';
import { SprintViewComponent } from './sprint-view/sprint-view.component';
import { ClosingViewComponent } from './closing-view/closing-view.component';
import { RetroViewComponent } from './retro-view/retro-view.component';
import { StateOverviewComponent } from './state-overview/state-overview.component';

function clamp(a, b, c) {
  return Math.max(b, Math.min(c, a));
}

export const reducer: Reducer<AppState> =
  (state: AppState = initialState, action: Action): AppState => {
    console.log('reducer1 running');
    const newState: AppState = Object.assign({}, state);
    switch (action.type) {
      case 'START_SPRINT': {
        const sprint = (<StartAction>action).sprint;
        sprint.stories = (<StartAction>action).stories;
        sprint.state = SprintState.Started;
        newState.sprints.push(sprint);
        return newState;
      }
      case 'RETROSPECT':
        // const sprint = (<RetroAction>action).sprint;
        return newState;
      default:
        return state;
    }
};

export const TeamStatReducer: Reducer<TeamStatState> =
  (state: TeamStatState = initialTeamStatState, action: TeamStatChangeAction): TeamStatState => {
    const newState: TeamStatState = Object.assign({}, state);
    switch (action.type) {
      case 'CHANGE_TEAM_STAT':
        newState.happiness += action.happinessDelta;
        newState.velocity += action.velocityDelta;
        newState.happiness = clamp(5, 1, newState.happiness);
        if (newState.velocity < 0) {
          newState.velocity = 0;
        }
        return newState;
      default:
        return state;
    }
  };

export const WorkStateReducer: Reducer<AppWorkState> =
  (state: AppWorkState = initialWorkState, action: WorkStateAction): AppWorkState => {
    console.log('WorkStateReducer running');
    const newState: AppWorkState = Object.assign({}, state);
    switch (action.type) {
      case 'CHANGE_WORK_STATE':
        newState.workState = action.newWorkState;
        return newState;
      default:
        return state;
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
    reducers: { reducer, TeamStatReducer, WorkStateReducer },
    additionalMiddlewares: [loggerMiddleware],
    debug: true // accepts a function as well
  })();
}

@NgModule({
  declarations: [
    AppComponent,
    PlanningViewComponent,
    SprintViewComponent,
    ClosingViewComponent,
    RetroViewComponent,
    StateOverviewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [{provide: AppStore, useFactory: appStoreFactory}],
  bootstrap: [AppComponent]
})

export class AppModule { }
