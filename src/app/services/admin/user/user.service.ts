import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { Buy } from 'src/app/models/buy.model';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.endpoint;
  constructor(private http: HttpClient) {}

  getClients() {
    return this.http.get(`${this.url}user`);
  }
  getClient(id: string) {
    return this.http.get(`${this.url}user/${id}`);
  }

  addClient(user: User) {
    return this.http.post(`${this.url}user`, user);
  }

  updateClient(id: string, user: FormData) {
    return this.http.patch(`${this.url}user/${id}`, user);
  }
  deleteClient(id: string) {
    return this.http.delete(`${this.url}user/${id}`);
  }
  addBuy(buy: Buy) {
    return this.http.post(`${this.url}buy/`, buy);
  }
}
