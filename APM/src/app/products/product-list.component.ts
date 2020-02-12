import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { Subscription, Observable, EMPTY, BehaviorSubject, combineLatest } from 'rxjs';

import { Product } from './product';
import { ProductService } from './product.service';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { ProductCategoryService } from '../product-categories/product-category.service';
import { ProductCategory } from '../product-categories/product-category';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnDestroy {
  pageTitle = 'Product List';
  errorMessage = '';
  // selectedCategoryId: number;

  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();
  
  products$ = combineLatest([
    this.productService.productsWithCategory$,
    this.categorySelectedAction$
  ])
    .pipe(
      tap(val => console.log('the value of products: ' + val)),
      map(([products, selectedCategoryId]) =>
        products.filter(product => 
            selectedCategoryId ? product.categoryId === selectedCategoryId : true
          )),
          tap(val => console.log('the value of products: ' + val)),
          catchError(err => {
            this.errorMessage = err;
            return EMPTY;
          })
    );
    
  categories$ = this.categoryService.productCategories$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

   
  // products: Product[] = [];
  // products$: Observable<Product[]>;?
  // products$ = this.productService.productsWithCategory$
  //   .pipe(
  //     catchError(err => {
  //       this.errorMessage = err;
  //       return EMPTY;
  //     })  
  //   )// no more ngOnInit() calls and pipe it to handle any thorwn errors

    // simpleFilter$ = this.productService.productsWithCategory$
    // .pipe(
    //   map(products =>
    //     products.filter(product =>
    //       this.selectedCategoryId ? product.categoryId === +this.selectedCategoryId : true
    //       ))
    // );

  sub: Subscription;

  constructor(private productService: ProductService, private categoryService: ProductCategoryService) { }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  //at this point there is no action occurring on the streams.  We need to react to actions
  //we need to combine our datastream and action stream
  //use BehaviorSubject or Subject
  onSelected(categoryId: string): void {
    console.log('categoryId: ' + (categoryId));
    // this.selectedCategoryId = +categoryId;
    this.categorySelectedSubject.next(+categoryId);

  }
}
