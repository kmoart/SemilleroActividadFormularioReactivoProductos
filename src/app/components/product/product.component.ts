import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../shared/services/product-service/product.service';
import { ProductModel } from '../../core/models/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { typesOfProduct } from '../../shared/constants/types-of-product.constants';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  form!: FormGroup;
  typeOfProduct: number=0;
  @Input() listOfProducts:Array<ProductModel>=[];
  discountProduct: number=0;
  showDiscount= false;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly productService: ProductService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    //Hacemos el uso de nuestra variable formBuilder inyectada creando un grupo nuevo
    this.form = this.formBuilder.group({
      productId: ['', [Validators.required]],
      typeOfProduct: [undefined, [Validators.required]],
      name: ['',[Validators.required]],
      price: [0, [Validators.required]],
      checkDiscount:[false],
      discount:[0, [Validators.required]]
    });
  }

  addTypeOfProduct() : number | string {
   
    this.typeOfProduct= this.form.get('typeOfProduct')?.value;
    const discountProduct = this.listOfProducts.find( ( product : ProductModel ) => product.typeOfProduct == this.typeOfProduct);
    return  discountProduct ?  discountProduct.discount!:'Seleccione tipo de producto' ;
    
  }

  changeCheckValue(){
    if(this.form.get('checkDiscount')?.value==false){
      this.showDiscount= true;
      this.form.patchValue({discount: this.addTypeOfProduct()} );
    }else{
      this.showDiscount= false;
      this.form.patchValue({discount: 0} );
    }
  }

  onClickSave(): void{
      if( this.form.valid ){
        console.log(this.form.value);
        const product: ProductModel = { ...this.form.value };
        console.log('Producto a guardar:', product);
        this.productService.saveProduct(product).subscribe(
          (product: ProductModel ) => {
            //logic - if request success
            this.form.reset();
            console.log(`Se ha guardado con éxito el usuario: ${product.productId} - ${product.name}`);
            //Al servicio de productos se le va a asignar un valor que va a ser igual a true
            // Cada vez que guarda con el subscribe anterior va a ser true.
            this.productService.setChanges(true);
          }, //try
          (error: HttpErrorResponse ) => {
            // logic - if request is bad
          } //catch
        );
      }else{
        alert('El formulario no se encuentra válido.');
      }
  }

}
