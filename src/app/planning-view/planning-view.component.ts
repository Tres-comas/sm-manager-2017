import { Component, Inject, OnInit } from '@angular/core';
import { AppStore } from 'angular2-redux';
import {SprintState, Story} from '../states/app-states';
import { StartAction } from '../actions/actions';

@Component({
  selector: 'app-planning-view',
  templateUrl: './planning-view.component.html',
  styleUrls: ['./planning-view.component.sass']
})
export class PlanningViewComponent implements OnInit {
  public storiesInBacklog: Story[];

  constructor(@Inject(AppStore) private appStore: AppStore) { }

  ngOnInit() {
    this.storiesInBacklog = this._getStories();
  }

  startSprint() {
    const sprint = {
      stories: [],
      state: SprintState.Open,
      deliveredPoints: 0
    };

    const stories = this._getStories();

    this.appStore.dispatch({
      type: 'START_SPRINT',
      sprint,
      stories
    } as StartAction );
  }

  private _getStories() {
    const stories = [
      {
        title: 'First',
        estimate: 3
      },
      {
        title: 'First',
        estimate: 3
      },
      {
        title: 'First',
        estimate: 3
      },
      {
        title: 'First',
        estimate: 3
      },
      {
        title: 'First',
        estimate: 3
      },
      {
        title: 'First',
        estimate: 3
      }
    ];

    return stories as Story[];
  }
}
