import { Component, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin/admin/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  constructor(private adminService: AdminService) {
    this.dataSource = new MatTableDataSource();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  adminInterface: User = {
    _id: '',
    username: '',
    password: '',
    email: '',
  };

  add: string = 'Agregar';
  update: string = 'Actualizar';
  acction: boolean = true;
  dataSource: MatTableDataSource<User>;

  admins: User[] = [];
  displayedColumns: string[] = ['Nombre', 'Email', 'Acciones'];
  ngOnInit(): void {
    this.getAdmins();
  }

  addAdmin() {
    delete this.adminInterface._id;
    this.adminService.addAdmin(this.adminInterface).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAdmins() {
    this.adminService.getAdmins().subscribe(
      (res: any) => {
        this.admins = res;
        this.admins.forEach((admin: any) => {
          delete admin.password;
          delete admin.photo;
        });
        this.dataSource = new MatTableDataSource(this.admins);
        console.log(this.admins);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getAdmin(id: string) {
    this.acction = false;
    this.adminService.getAdmin(id).subscribe(
      (res: any) => {
        console.log(res);
        delete res.password;
        this.adminInterface = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateAdmin() {
    const id = this.adminInterface._id;
    delete this.adminInterface._id;
    delete this.adminInterface.photo;

    this.adminService.updateAdmin(id!, this.adminInterface).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  deleteAdmin(id: string) {
    this.adminService.deleteAdmin(id).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  cancel() {
    this.acction = true;
  }
}
