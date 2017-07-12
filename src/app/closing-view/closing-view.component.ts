import {Component, Inject, OnInit} from '@angular/core';
import {SprintState, WorkState} from '../states/app-states';
import {RetroAction, WorkStateAction} from '../actions/actions';
import {AppStore} from 'angular2-redux';

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
    const sprint = {
      stories: [],
      state: SprintState.Finished,
      deliveredPoints: this._getStories().map(item => item.estimate)[0]
    };

    this.appStore.dispatch({
      type: 'RETROSPECT',
      sprint
    } as RetroAction );
    this.appStore.dispatch({
      type: 'CHANGE_WORK_STATE',
      newWorkState: WorkState.Retro
    } as WorkStateAction);
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
