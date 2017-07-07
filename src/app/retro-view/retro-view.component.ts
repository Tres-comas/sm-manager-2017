import {Component, Inject, OnInit} from '@angular/core';
import {AppStore} from 'angular2-redux';
import {PlanningAction} from '../actions/actions';

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
      type: 'START_PLANNING',
      velocityDelta: 1,
      happinessDelta: -1
    } as PlanningAction )
  }
}
