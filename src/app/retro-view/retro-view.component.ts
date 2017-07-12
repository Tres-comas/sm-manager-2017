import { Component, Inject, OnInit } from '@angular/core';
import { AppStore } from 'angular2-redux';
import { TeamStatChangeAction, WorkStateAction } from '../actions/actions';
import { WorkState } from '../states/app-states';

@Component({
  selector: 'app-retro-view',
  templateUrl: './retro-view.component.html',
  styleUrls: ['./retro-view.component.sass']
})
export class RetroViewComponent implements OnInit {

  constructor(@Inject(AppStore) public appStore: AppStore) {}

  ngOnInit() {
  }

  goToPlanning() {
    this.appStore.dispatch({
      type: 'CHANGE_TEAM_STAT',
      velocityDelta: 1,
      happinessDelta: -1
    } as TeamStatChangeAction);
    this.appStore.dispatch({
      type: 'CHANGE_WORK_STATE',
      newWorkState: WorkState.Planning
    } as WorkStateAction);
  }
}
