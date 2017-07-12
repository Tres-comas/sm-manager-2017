import {Component, Inject, OnInit} from '@angular/core';
import { TeamStatChangeAction, WorkStateAction } from '../actions/actions';
import {AppStore} from 'angular2-redux';
import {WorkState} from '../states/app-states';

@Component({
  selector: 'app-sprint-view',
  templateUrl: './sprint-view.component.html',
  styleUrls: ['./sprint-view.component.sass']
})

export class SprintViewComponent implements OnInit {
  constructor(@Inject(AppStore) private appStore: AppStore) { }

  ngOnInit() {
    setTimeout(() => {
      this.finishSprint();
    }, 2000);
  }

  finishSprint() {
    const happinessDelta = Math.random() * 2 - 1;
    this.appStore.dispatch({
      type: 'CHANGE_TEAM_STAT',
      happinessDelta,
      velocityDelta: 0
    } as TeamStatChangeAction );
    this.appStore.dispatch({
      type: 'CHANGE_WORK_STATE',
      newWorkState: WorkState.Closing
    } as WorkStateAction);
  }
}
