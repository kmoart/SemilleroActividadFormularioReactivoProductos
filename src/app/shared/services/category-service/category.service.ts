import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CategoryModel } from '../../../core/models/categories.models';
import { typesOfProduct } from '../../constants/types-of-product.constants';

@Injectable()
export class CategoryService {

  constructor() { }

  getCategory(): Observable<CategoryModel[]> {
    return of(typesOfProduct);
  }
}
