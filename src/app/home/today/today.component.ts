import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Task} from '../../interface/task';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit, OnChanges {

  // add task
  public addTaskMode = false
  public taskName
  public newTask = {} as Task;

  // edit task
  public activeRow = {}
  public activeTask = {} as Task;

  // filter
  public filterOption
  public filteredTasks

  @Input() todayTasks
  @Input() filterDone
  @Input() filterUndone
  @Output() taskAdded = new EventEmitter<any>();

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (this.filterDone === true && this.filterUndone === false) {
      this.filteredTasks = this.filterFinishedTasks(this.todayTasks)
      this.filterOption = true
    } else if (this.filterDone === false && this.filterUndone === true) {
      this.filteredTasks = this.filterUnfinishedTasks(this.todayTasks)
      this.filterOption = true
    } else {
      this.filterOption = false
    }
  }

  // CRUD Methods

  addTask() {
    this.newTask.description = this.taskName;
    this.newTask.finished = null
    this.todayTasks.push(this.newTask)
    this.taskAdded.emit(this.todayTasks)

    this.resetInformation()
  }

  updateTask() {
    this.activeTask.description = this.taskName
  }

  deleteTask() {
    const index = this.todayTasks.indexOf(this.activeTask)
    this.todayTasks.splice(index, 1);

    this.resetInformation()
  }

  // Template Methods

  openModal(content, currentTask) {
    this.activeTask = currentTask
    this.taskName = currentTask.description
    this.modalService.open(content)
  }

  onCheck(event, currentTask) {
    if (event.target.checked === true) {
      currentTask.finished = 'checked';
    } else {
      currentTask.finished = null
    }
    this.taskAdded.emit(this.todayTasks)

  }

  resetInformation() {
    this.addTaskMode = false;
    this.taskName = null;

    this.activeTask = {} as Task;
    this.newTask = {} as Task;
  }

  setActive(num) {
    this.activeRow[num] = true
  }

  setInactive(num) {
    this.activeRow[num] = false
  }

  filterFinishedTasks(array) {
    return array.filter((element) => {
      return element.finished === 'checked'
    });
  }

  filterUnfinishedTasks(array) {
    return array.filter((element) => {
      return element.finished === null
    });
  }

}
