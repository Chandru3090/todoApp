import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  BASE_URL = 'http://localhost:3000';
  user: any = {};

  constructor(private http: HttpClient) { }

  getToDoList() {
    return this.http.get(`${this.BASE_URL}/todo`);
  }

  remove(id: any) {
    return this.http.delete(`${this.BASE_URL}/todo/${id}`);
  }

  createToDo(body: any) {
    return this.http.post(`${this.BASE_URL}/todo`, body);
  }

  update(body: any) {
    return this.http.put(`${this.BASE_URL}/todo/${body._id}`, body);
  }

  register(body: any) {
    return this.http.post(`${this.BASE_URL}/register`, body);
  }

  login(body: any) {
    return this.http.post(`${this.BASE_URL}/login`, body);
  }

  loggedIn(value: boolean) {
    localStorage.setItem('isLoggedIn', 'true');
  }

  isloggedIn() {
    return (localStorage.getItem('isLoggedIn')) ? true : false;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
  }
}
