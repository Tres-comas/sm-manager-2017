import {Component, Inject, OnInit} from '@angular/core';
import {AppStore} from 'angular2-redux';
import {Sprint} from '../states/app-states';

@Component({
  selector: 'app-state-overview',
  templateUrl: './state-overview.component.html',
  styleUrls: ['./state-overview.component.sass']
})
export class StateOverviewComponent implements OnInit {
  public sprints: Sprint[];

  constructor(@Inject(AppStore) private appStore: AppStore) { }

  ngOnInit() {
    this.sprints = this.appStore.getState().reducer.sprints;
  }

}
