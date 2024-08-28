import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../../Core/Services/Seller Products/products.service';
import { Product } from '../../../Core/Model/seller';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {

  // Get product details propertie
  products: any =[];

  // Search button property
  searchResult:undefined|Product[];

  // Angular Material Table propertie
  dataSource! : MatTableDataSource<any>;

  // Table Columns names properties
  displayedColumns: string[] = 
  ['productId','productName','productPrice','productColour',
  'productQuantity', 'productCategory','productImage','productDescription','action'];

  // Table Pagination propertie
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router, private ProductsService: ProductsService,private messageService: MessageService){}

  ngOnInit(){
    // This method is responsible for fetching the list of products
    this.listOfProduct();
  }

   // The listOfProduct function calls from the "getProductList" method from the "Product" Service Get request
   // to get the seller product details data on the mongoDb databse.
  listOfProduct(){
    this.ProductsService.getSellerProductList().subscribe((result) =>  {
      if(result){
        this.products = result
        // Table Pagination code
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  // The deleteProduct function calls from the "getDeleteProduct" method from the "Product" Service Delete request
  deleteProduct(id: number) {
    if(confirm('Are you sure you want to delete this product?'))
    this.ProductsService.DeleteProduct(id).subscribe(      
      response => {
              this.listOfProduct();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Record deleted" });
      console.log(response);
    },
    error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
    });
  }

  // navigate to add product page
  addProduct(){
    this.router.navigate(['add-product']);
  }
  
  // navigate to update product page
  updateProduct(id: number){
    this.router.navigate(['update-product',id]);
  }


 // Search Products Filter Products code
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
}
