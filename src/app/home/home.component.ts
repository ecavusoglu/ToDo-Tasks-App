import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public activeTab = 0

  public todayTasks = []
  public weeklyTasks = []

  public filterDone = false
  public filterUndone = false

  constructor() { }

  ngOnInit() {
  }

  selectedSupplierTab(num) {
    if (num === this.activeTab) {
      return true
    } else {
      return false
    }
  }

  onDailyTaskAdded(taskData) {
    this.todayTasks = taskData;
  }

  onWeeklyTaskAdded(taskData) {
    this.weeklyTasks = taskData;
  }

  filterFinished(event) {

    if (event.target.checked === true) {
      this.filterDone = true
    } else {
      this.filterDone = false
    }
  }

  filterUnfinished(event) {

    if (event.target.checked === true) {
      // }
      this.filterUndone = true
    } else {
      this.filterUndone = false
    }
  }

}
