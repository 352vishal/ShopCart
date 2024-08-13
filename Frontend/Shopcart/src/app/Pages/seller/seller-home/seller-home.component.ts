import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../../Core/Services/Seller Products/products.service';
import { Product } from '../../../Core/Model/seller';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../Core/Services/Seller-Auth/auth.service';


@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {

  // Get product details propertie
  products: any =[];

  // Display seller name on navbar  
  sellerName:string="";

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

  // Display User FullName from Token
  fullName : string = "";

  constructor(private router: Router,private auth: AuthService, private ProductsService: ProductsService,private messageService: MessageService){}

  ngOnInit(){

    // Display User FullName from Token
    this.ProductsService.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken
    });

    // This method is responsible for fetching the list of products
    this.listOfProduct();
    // Get Seller Name from local storage and display on navbar
    if(localStorage.getItem('seller')){
      let sellerStore=localStorage.getItem('seller');
      let sellerData =sellerStore && JSON.parse(sellerStore)[1];
      this.sellerName=sellerData.email;
   }
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
    this.ProductsService.DeleteProduct(id).subscribe(      
      response => {
      if(confirm('Are you sure you want to delete this product?'))
      this.listOfProduct();
      console.log(response);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Delete Product Successfully" });
    },
    error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
    })
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
