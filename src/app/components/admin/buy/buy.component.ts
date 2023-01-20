import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { ProductService } from 'src/app/services/admin/product/product.service';
import { UserService } from 'src/app/services/admin/user/user.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Buy } from 'src/app/models/buy.model';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
})
export class BuyComponent {
  client: User = {
    _id: '',
    username: '',
    email: '',
    password: '',
  };
  buy: Buy = {
    client: {
      _id: '',
      username: '',
      email: '',
    },
    list: [],
    total: 0,
  };
  isVisibleTable: boolean = false;
  isVisibleCheck: boolean = true;
  isVisibleAddButton: boolean = false;
  total = 0;
  labes: string[] = [
    'Nombre del producto',
    'Precio',
    'Cantidad',
    'Total producto',
  ];
  dataSource: MatTableDataSource<Product>;
  list: any[] = [];
  cart: any;
  myControl = new FormControl('');
  products: any[] = [];
  filteredOptions: Observable<any[]> | undefined;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private productService: ProductService
  ) {
    this.dataSource = new MatTableDataSource();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let clienteId: any = params.get('clientId');
      this.userService.getClient(clienteId).subscribe((res: any) => {
        delete res.password;
        this.client = res;
        if (this.client.photo) {
          this.client.photo = environment.endpoint + this.client.photo;
        }
      });
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    this.getProducts();
  }
  getProducts() {
    this.productService.getProducts().subscribe(
      (res: any) => {
        this.products = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  seleccionarProducto(event: any): void {
    if (event.length > 0) {
      this.isVisibleAddButton = true;
    } else {
      this.isVisibleAddButton = false;
    }
    event.forEach((element: any) => {
      element.count = 1;
      element.total = element.cost;
    });
    this.list = event;
    this.dataSource = new MatTableDataSource(this.list);
  }

  confirmCheck() {
    this.isVisibleCheck = false;
    this.isVisibleTable = true;
    this.getTotal();
  }

  incrementItem(id: string) {
    this.list.map((item) => {
      if (item._id == id) {
        item.count = item.count + 1;
        item.total = item.count * item.cost;
      }
    });
    this.getTotal();
  }

  decrementItem(id: string) {
    this.list.map((item) => {
      if (item._id == id && item.count > 1) {
        item.count = item.count - 1;
        item.total = item.count * item.cost;
      }
    });
    this.getTotal();
  }

  getTotal() {
    this.total = 0;
    this.list.forEach((x: any) => {
      this.total = x.total + this.total;
    });
  }

  setBuy() {
    this.buy.client = this.client;
    this.buy.list = this.list;
    this.buy.total = this.total;
   
    this.userService.addBuy(this.buy).subscribe((res) => {
      console.log(res);
    });
  }

  private _filter(value: any) {
    console.log(value);

    const filterValue = value.toLowerCase();

    return this.products.filter((product: any) =>
      product.name.toLowerCase().includes(filterValue)
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
}
