import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { groupBy } from 'rxjs/internal/operators/groupBy';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  @Input() todoList: any;
  @Output() remove = new EventEmitter();
  @Output() statusChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
    console.log(this.todoList);
  }

  toStatusChange(event: any) {
    if (!event.status) {
      event.status = true;
      this.statusChange.emit(event);
    }
  }

  toRemove(event: any) {
    this.remove.emit(event);
  }
}
