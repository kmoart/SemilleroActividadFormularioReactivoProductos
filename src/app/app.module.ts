import { AppComponent } from './app.component';

// modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// components
import { ProductComponent } from './components/product/product.component';
import { ProductsListComponent } from './components/products-list/products-list.component';

// Services
import { ProductService } from './shared/services/product-service/product.service';
import { CategoryService } from './shared/services/category-service/category.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductService,
    CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
