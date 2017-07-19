import { Component, Inject, OnInit } from '@angular/core';
import { AppStore } from 'angular2-redux';
import {SprintState, Story, WorkState} from '../states/app-states';
import {StartAction, WorkStateAction} from '../actions/actions';

@Component({
  selector: 'app-planning-view',
  templateUrl: './planning-view.component.html',
  styleUrls: ['./planning-view.component.sass']
})
export class PlanningViewComponent implements OnInit {
  public storiesInBacklog: Story[];
  private _storiesInSprint: Story[] = [];

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

    const stories = this._storiesInSprint;

    this.appStore.dispatch({
      type: 'START_SPRINT',
      sprint,
      stories
    } as StartAction );
    this.appStore.dispatch({
      type: 'CHANGE_WORK_STATE',
      newWorkState: WorkState.Working
    } as WorkStateAction);
  }

  get storyNumber(): number {
    return this.appStore.getState().reducer.sprints.length + 1;
  }

  get cumulatedPoints(): number {
    return this._storiesInSprint.reduce((cur, item) => cur + item.estimate, 0);
  }

  get teamVelocity(): number {
    const sprints = this.appStore.getState().reducer.sprints;
    if (sprints && sprints.length) {
      let allSum = 0;
      for (const sprint of sprints) {
        // Calculate with committed points
        /* const sprintSum = sprint.stories.reduce((cur, item) => cur + item.estimate, 0);
        allSum += sprintSum; */

        // Calculate with delivered points
        allSum += sprint.deliveredPoints;
      }
      return allSum / sprints.length;
    }
    // Show initial velocity
    // return this.appStore.getState().TeamStatReducer.velocity;

    // Blind mode
    return 0;
  }

  storyToggled($event, story: Story) {
    if ($event.target.checked) {
      this._storiesInSprint.push(story);
    } else {
      this._storiesInSprint = this._storiesInSprint.filter(storyInSprint => story !== storyInSprint);
    }
  }

  private _getStories() {
    const stories = [
      {
        title: 'First',
        estimate: 5
      },
      {
        title: 'Story',
        estimate: 2
      },
      {
        title: 'Asdf',
        estimate: 1
      },
      {
        title: 'Support',
        estimate: 3
      },
      {
        title: 'E2E',
        estimate: 3
      },
      {
        title: 'Kaizen',
        estimate: 2
      },
      {
        title: '.NET',
        estimate: 3
      },
      {
        title: 'TechDebt',
        estimate: 2
      }
    ];

    return stories as Story[];
  }
}
