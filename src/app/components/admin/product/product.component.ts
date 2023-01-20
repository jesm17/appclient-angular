import { Component, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from '../../../services/admin/product/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  productInterface: Product = {
    _id: '',
    name: '',
    description: '',
    cost: 0,
  };
  products: Product[] = [];
  displayedColumns: string[] = ['Nombre', 'Descripcion', 'Costo', 'Acciones'];
  dataSource: MatTableDataSource<Product>;
  constructor(private productService: ProductService) {
    this.dataSource = new MatTableDataSource();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getProducts();
  }
  getProducts() {
    this.productService.getProducts().subscribe(
      (res: any) => {
        this.products = res;
        console.log(this.products);
        this.dataSource = new MatTableDataSource(this.products);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  addProduct() {
    delete this.productInterface._id;
    this.productService.createProduct(this.productInterface).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getProduct(id: string) {
    this.productService.getProduct(id).subscribe(
      (res: any) => {
        this.productInterface = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  updateProduct() {
    const id = this.productInterface._id;
    delete this.productInterface._id;
    this.productService.updateProduct(id!, this.productInterface).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    console.log(id);
  }
  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe(
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
  clear() {
    this.productInterface._id = '';
    this.productInterface.cost = 0;
    this.productInterface.description = '';
    this.productInterface.name = '';
  }
}
