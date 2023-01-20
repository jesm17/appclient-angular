import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  url = environment.endpoint;
  constructor(private http: HttpClient) {}

  addAdmin(admin: User) {
    return this.http.post(`${this.url}admin`, admin);
  }

  getAdmins() {
    return this.http.get(`${this.url}admin`);
  }

  getAdmin(id: string) {
    return this.http.get(`${this.url}admin/${id}`);
  }

  updateAdmin(id: string, admin: any) {
    return this.http.put(`${this.url}admin/${id}`, admin);
  }

  deleteAdmin(id: string) {
    return this.http.delete(`${this.url}admin/${id}`);
  }


}
