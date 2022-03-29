import { Component } from '@angular/core';
import { ProductModel } from './core/models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FormulariosReactivosProd';

  listOfProducts : Array<ProductModel> =[];

  onClickEvent(listOfProducts: ProductModel[]){
    console.log('Lista de productos en AppComponent',listOfProducts);
  this.listOfProducts = listOfProducts;
  }
}
