import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { CONSTANTS } from '../constants'
import { Router } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  todoLists: any = [];
  alertFailure: any;
  alertSuccess: any;
  constant = CONSTANTS;
  inprogressList = 0;
  constructor(private service: TodoService, private router: Router) { }

  ngOnInit() {
    this.getToDoList();
  }

  toRemove(event: any) {
    this.service.remove(event).subscribe(data => {
      if (data) {
        console.log(data);
        this.getToDoList();
        this.alertSuccess = this.constant.REMOVE_SUCCESS;
        this.alertRest();
      }
    }, error => {
      console.log(error);
      this.alertFailure = this.constant.FAILURE;
      this.alertRest();
    });
  }

  toChange(event: any) {
    this.service.update(event).subscribe(data => {
      if (data) {
        console.log(data);
        this.getToDoList();
        this.alertSuccess = this.constant.UPDATE_SUCCESS;
        this.alertRest();
      }
    }, error => {
      console.log(error);
      this.alertFailure = this.constant.FAILURE;
      this.alertRest();
    });
  }

  createToDo(event: any) {
    this.service.createToDo(event).subscribe(data => {
      if (data) {
        console.log(data);
        this.getToDoList();
        this.alertSuccess = this.constant.INSERT_SUCCESS;
        this.alertRest();
      }
    }, error => {
      this.alertFailure = this.constant.FAILURE;
      console.log(error);
    })
  }

  getToDoList() {
    this.service.getToDoList().subscribe(data => {
      if (data) {
        this.todoLists = data
        this.todoLists.sort((a, b) => {
          return a.status - b.status;
        });
        this.inprogressList = this.todoLists.filter(x => x.status).length;
      }
    }, error => {
      console.log(error);
      this.alertFailure = this.constant.FAILURE;
      this.alertRest();
    });
  }

  alertRest() {
    setTimeout(() => {
      this.alertFailure = '';
      this.alertSuccess = '';
    }, 3000)
  }

  logOut() {
    this.service.user = {};
    this.service.logout();
    this.router.navigate(['login']);
  }
}
