import { Injectable } from '@angular/core';
import { DiscountModel } from '../../../core/models/discount.model';
import { Observable, of } from 'rxjs';
import { discounts } from '../../constants/discount.constant';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor() { }

  getAllDiscount(): Observable<DiscountModel[]>{
    return of(discounts);
  }
}
