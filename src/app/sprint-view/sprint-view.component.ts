import {Component, Inject, OnInit} from '@angular/core';
import {StopAction} from '../actions/actions';
import {AppStore} from 'angular2-redux';

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
      type: 'FINISH_SPRINT',
      happinessDelta
    } as StopAction );
  }
}
