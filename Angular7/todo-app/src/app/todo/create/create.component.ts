import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  todoForm: FormGroup;
  @Output() todoAdd = new EventEmitter();
  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      status:[false]
    })
  }

  add() {
    if (this.todoForm.valid) {
      this.todoAdd.emit(this.todoForm.value);
      setTimeout(() => {
        this.todoForm.get('title').setValue('');
      }, 2000)
    }
  }
}
