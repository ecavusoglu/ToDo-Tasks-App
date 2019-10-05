import {Component, EventEmitter, Input, OnInit, Output, OnChanges} from '@angular/core';
import {Task} from '../../interface/task';
import {formatDate} from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css']
})
export class WeeklyComponent implements OnInit, OnChanges {

  // add task
  public addTaskMode = false
  public taskName
  public newTask = {} as Task;

  @Input() weeklyTasks
  @Input() filterDone
  @Input() filterUndone
  @Output() taskAdded = new EventEmitter<any>();

  // date picker
  public currentDate
  public currentDateArray
  public taskDate
  public taskDateArray

  // edit task
  public activeRow = {}
  public activeTask = {} as Task;
  public editTaskMode = false

  // filter
  public filterOption
  public filteredTasks

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.currentDate = formatDate(new Date(), 'dd/MM/yyyy', 'en');
    this.currentDateArray = this.currentDate.split('/');
  }

  ngOnChanges(changes) {
    if (this.filterDone === true && this.filterUndone === false) {
      this.filteredTasks = this.filterFinishedTasks(this.weeklyTasks)
      this.filterOption = true
    } else if (this.filterDone === false && this.filterUndone === true) {
      this.filteredTasks = this.filterUnfinishedTasks(this.weeklyTasks)
      this.filterOption = true
    } else {
      this.filterOption = false
    }
  }

  // CRUD Methods

  addTask() {
    this.taskDate = formatDate(this.taskDate, 'dd/MM/yyyy', 'en')
    this.taskDateArray = this.taskDate.split('/');

    if (this.checkDate()) {
      this.newTask.description = this.taskName;
      this.newTask.finished = null
      this.newTask.date = this.taskDate

      this.weeklyTasks.push(this.newTask)
      this.weeklyTasks = this.sortArray(this.weeklyTasks)
      this.taskAdded.emit(this.weeklyTasks)
    }
    this.resetInformation()
  }

  updateTask() {
    if (this.taskDate !== this.activeTask.date) {
      this.taskDate = formatDate(this.taskDate, 'dd/MM/yyyy', 'en')
    }
    this.taskDateArray = this.taskDate.split('/');


    if (this.checkDate()) {
      this.activeTask.description = this.taskName
      this.activeTask.date = this.taskDate
      this.weeklyTasks = this.sortArray(this.weeklyTasks)
      this.taskAdded.emit(this.weeklyTasks)
    }
    this.resetInformation()
  }

  deleteTask() {
    const index = this.weeklyTasks.indexOf(this.activeTask)
    this.weeklyTasks.splice(index, 1);

    this.resetInformation()
  }

  // Template Methods

  onCheck(event, currentTask) {
    if (event.target.checked === true) {
      currentTask.finished = 'checked';
    } else {
      currentTask.finished = null
    }
    this.taskAdded.emit(this.weeklyTasks)
  }

  checkDate() {
    if (this.taskDateArray[1] === this.currentDateArray[1] &&
        this.taskDateArray[2] === this.currentDateArray[2] &&
        +this.taskDateArray[0] < +this.currentDateArray[0] + 7 &&
        this.taskDateArray[0] > this.currentDateArray[0]) {
      return true;
    }
    return false;
  }

  resetInformation() {
    this.addTaskMode = false;
    this.taskName = null;
    this.taskDate = null;
    this.taskDateArray = null;

    this.newTask = {} as Task;
  }

  openModal(content, currentTask) {
    this.activeTask = currentTask
    this.taskName = currentTask.description
    this.taskDate = currentTask.date
    this.modalService.open(content)
  }

  sortArray(array) {
    return array.sort((a, b) => a.date.localeCompare(b.date));
  }

  setActive(num) {
    this.activeRow[num] = true
  }

  setInactive(num) {
    this.activeRow[num] = false
  }

  editTaskClicked(currentTask) {
    this.activeTask = currentTask
    this.taskName = currentTask.description
    this.taskDate = currentTask.date

    this.editTaskMode = true;
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
