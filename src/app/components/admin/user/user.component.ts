import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../../services/admin/user/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Route, Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  displayedColumns: string[] = [
    'Foto',
    'Nombre de usuario',
    'Email',
    'Acciones',
  ];
  users: any = [];

  userInterface: User = {
    username: '',
    password: '',
    email: '',
    photo: '',
    _id: '',
  };

  dataSource: MatTableDataSource<User>;

  constructor(private userService: UserService, private router: Router) {
    this.dataSource = new MatTableDataSource();

  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.userService.getClients().subscribe(
      (res: any) => {
        this.users = res;
        this.users.forEach((user: any) => {
          if (user.photo) {
            user.photo = environment.endpoint + user.photo;
          }
        });
        console.log(res);
        this.dataSource = new MatTableDataSource(this.users);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getClient(id: string) {
    this.userService.getClient(id).subscribe(
      (res: any) => {
        delete res.password;

        this.userInterface = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addClient() {
    delete this.userInterface._id;
    this.userService.addClient(this.userInterface).subscribe(
      (res: any) => {
        if (res.status == 200) {
          Swal.fire({
            title: 'Listo !',
            text: res.message,
            icon: 'success',
            showConfirmButton: false,
          });
          setTimeout(() => {
            document.location.reload();
          }, 1500);
        } else {
          Swal.fire({
            title: 'Oops !',
            text: res.message,
            icon: 'error',
          });
        }
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateClient() {
    const body = new FormData();
    body.append('username', this.userInterface.username);
    body.append('email', this.userInterface.email);
    body.append('password', this.userInterface.password);
    body.append('photo', this.userInterface.photo);

    this.userService.updateClient(this.userInterface._id!, body).subscribe(
      (res: any) => {
        if (res.status == 200) {
          Swal.fire({
            title: 'Listo !',
            text: res.message,
            icon: 'success',
            showConfirmButton: false,
          });
          setTimeout(() => {
            document.location.reload();
          }, 1500);
        } else {
          Swal.fire({
            title: 'Ooops!',
            text: res.message,
            icon: 'error',
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  redirecBuy(id:string) {
    this.router.navigate(['admin/addbuy']);
  }

  getFile($event: any): void {
    const [file] = $event.target.files;
    this.userInterface.photo = file;
  }

  deleteClient(id: string) {
    Swal.fire({
      title: 'Esta seguro de eliminar este cliente?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#004643',
      cancelButtonColor: '#dc2626',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteClient(id).subscribe(
          (res: any) => {
            if (res.status == 200) {
              Swal.fire({
                title: 'Listo !',
                text: res.message,
                icon: 'success',
                showConfirmButton: false,
              });
              setTimeout(() => {
                document.location.reload();
              }, 1500);
            } else {
              Swal.fire({
                title: 'Ooops!',
                text: res.message,
                icon: 'error',
                showConfirmButton: false,
              });
            }
          },
          (err) => console.log(err)
        );
        //Swal.fire('E!', 'Your file has been deleted.', 'success');
      }
    });
  }

  cancel() {
    this.userInterface.email = '';
    this.userInterface.password = '';
    this.userInterface.username = '';
    this.userInterface.photo = '';
  }


}
