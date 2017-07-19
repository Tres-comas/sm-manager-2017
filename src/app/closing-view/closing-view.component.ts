import { Component, Inject, OnInit } from '@angular/core';
import { WorkState } from '../states/app-states';
import { CloseSprintAction, WorkStateAction } from '../actions/actions';
import { AppStore } from 'angular2-redux';

@Component({
  selector: 'app-closing-view',
  templateUrl: './closing-view.component.html',
  styleUrls: ['./closing-view.component.sass']
})
export class ClosingViewComponent implements OnInit {

  constructor(@Inject(AppStore) public appStore: AppStore) {}

  ngOnInit() {
  }

  goToRetro() {
    const sprintList = this.appStore.getState().reducer.sprints;
    const sprint = sprintList[sprintList.length - 1];
    const storyMax = sprint.stories.reduce((a, item) => a + item.estimate, 0);
    const deliveredPoints = Math.min(Math.floor(this.appStore.getState().TeamStatReducer.velocity), storyMax);

    this.appStore.dispatch({
      type: 'CLOSE_SPRINT',
      sprint,
      deliveredPoints
    } as CloseSprintAction );
    this.appStore.dispatch({
      type: 'CHANGE_WORK_STATE',
      newWorkState: WorkState.Retro
    } as WorkStateAction);
  }
}
