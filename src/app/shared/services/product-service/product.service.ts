import { Injectable } from '@angular/core';
import { ProductModel } from '../../../core/models/product.model';
import { products } from '../../constants/products.constants';
import { of, Observable, tap, BehaviorSubject } from 'rxjs';

@Injectable()
export class ProductService {

  //Los behaviorsubjects sirven para enviar cambios o escuchar cambios
  private readonly changes = new BehaviorSubject<boolean>(false);

  constructor() { }

  getAllProducts(): Observable<ProductModel[]>{
    console.log('Executing method');

    return of(products).pipe(
      tap( ()=>{
        console.log('Executing query');
      })
    );
  }

  saveProduct(product: ProductModel): Observable<ProductModel>{
    console.log('Executing method...');
    return of(product).pipe(
      tap( ()=>{
        products.push(product);
        console.log('Executing save...');
      })
    );
  }

  getChanges(): Observable<boolean>{
    // Se retorna el behavior changes pero como un observable
    // Para saber cuando se está ejecutando se realiza un pipe
    return this.changes.asObservable().pipe(
      tap( ()=>{
        console.log('Executing change...');
      })
    );
  }

  setChanges(value: boolean): void{
    // le doy el siguiente valor
    this.changes.next(value);
  } 

}
