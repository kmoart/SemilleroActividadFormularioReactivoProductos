import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../../shared/services/product-service/product.service';
import { ProductModel } from '../../core/models/product.model';
import { CategoryService } from '../../shared/services/category-service/category.service';
import { CategoryModel } from '../../core/models/categories.models';
import { mergeMap, Observable, tap, of } from 'rxjs';
import { DiscountModel } from '../../core/models/discount.model';
import { DiscountService } from '../../shared/services/discount-service/discount.service';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  captionText = 'List of products';
  // La declaración de tipos de las siguientes variables significan lo mismo
  listOfProducts: Array<ProductModel> = [];
  listOfCategories: CategoryModel[] = [];
  listOfDiscounts: Array<DiscountModel> = [];
  discount: number=0;

  @Output() newItemEvent= new EventEmitter<ProductModel[]>();

  constructor( private readonly productService:ProductService,
               private readonly categoryService: CategoryService,
               private readonly discountService: DiscountService) { }

  ngOnInit(): void {
    this.callServices();
    // Cuando se consulte un valor se debe crear un listener
    this.listenerChanges();
  }

  //El método se encarga de administrar la forma en que se van a llamar los métodos de los servicios
  callServices(): void{
      this.getAllCategories().pipe(
        // El retorno del mergeMap es un observable
        mergeMap((categories:CategoryModel[])=>{
          console.log('Executing mergeMap...');
          return this.getAllProductos().pipe(
            mergeMap((products: ProductModel[]) =>{
              console.log('Executing mergeMap discounts');
              return this.getAllDiscounts();
            })
          );           
        })
      ).subscribe();
  }

  getAllDiscounts(): Observable<DiscountModel[]> {
    return this.discountService.getAllDiscount().pipe(
      tap((discounts: DiscountModel[]) =>{
           console.log('Executing getAllDiscounts...');
           this.listOfDiscounts = [...discounts];
           console.log('listOfDiscounts', this.listOfDiscounts);
      })    
    );
  }

  getAllCategories(): Observable<CategoryModel[]>{
    /*
    this.categoryService.getCategory().subscribe(
      (categories: CategoryModel[]) =>{
          this.listOfCategories = [...categories];
      }
    )*/

    //En vez de utilizar el subscribe anterior se utiliza el pipe a continuación
    return this.categoryService.getCategory().pipe(
      tap(
        (categories: CategoryModel[]) =>{
          console.log('Executing categories...');
          this.listOfCategories = [...categories];
        })
      );
  }

  // la firma del método es un observable por eso se cambia el retorno de void a Observable<ProductModel[]>
  getAllProductos(): Observable<ProductModel[]> {
      // El siguiente pipe hace parte de rxjs no es el pipe de angular, este pipe realiza un flujo de llamados
      // El pipe recibe varias operaciones que voy a realizar
      // El tap funciona como el primer parámetro que recibe una subscripción. Si hubo caso de exito el tap trae el valor con el cual resolvió el observable
      // y luego ejecuta el callback que tenemos que es guardar la lista de productos que hay y mostrar la lista en la consola
      return this.productService.getAllProducts().pipe(
           tap((products: ProductModel[]) =>{
                console.log('Executing getAllProducts...');
                this.listOfProducts = [...products];
                console.log('listOfProducts', this.listOfProducts);
                this.newItemEvent.emit(this.listOfProducts);
           })    
      );
     
  }

  listenerChanges(): void {
    // Para obtener el valor del desplegable se debe realizar un subscribe
    this.productService.getChanges().pipe(
      //Si el change es true entonces que consulte los productos si no, se devuelve uun observable vacío o of()
      mergeMap( ( change:boolean ) => change ? this.getAllProductos() : of())
        // Se va a ejecutar la consulta de los productos para eso se debe utilizar de nuevo un pipe en vez de un subscribe    
      ).subscribe();
  }

  transformType( typeId:number ): string | number {
    const categoryForChange = this.listOfCategories.find( ( category: CategoryModel ) => category.id === typeId);
    return categoryForChange ? categoryForChange.name : typeId; 
  }

  ShowDiscount(product: ProductModel): string | number {
    console.log('valor del producto en ShowDiscount', product);
     this.listOfDiscounts.find( (discount: DiscountModel) =>
    {
      if(discount.idProduct === product.productId){
          console.log('valor de discount en ShowDiscount:', discount);
          product.discount = discount.value;
          this.discount = discount.value;
        }
    });
    return product.discount!;
  }

  TotalValue( product: ProductModel ): number{
    if(product.discount != null){
      let totalValue = product.price - product.price * ((product.discount) /100);
      return totalValue;
    }else{
      return 0;
    }
    
  }

  trackByItems(index: number, item: ProductModel): number {
    return item.productId;
  }

}
