import { Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IProducto } from '../interfaces';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService extends BaseService<IProducto> {
    protected override source: string = 'producto';
    private productoListSignal = signal<IProducto[]>([]);
    get producto$() {
      return this.productoListSignal;
    }
    getAllSignal() {
      this.findAll().subscribe({
        next: (response: any) => {
          response.reverse();
          this.productoListSignal.set(response);
        },
        error: (error: any) => {
          console.error('Error fetching products', error);
        }
      });
    }
    saveProductoSignal (producto: IProducto): Observable<any>{
      return this.add(producto).pipe(
        tap((response: any) => {
          this.productoListSignal.update( producto => [response, ...producto]);
        }),
        catchError(error => {
          console.error('Error saving producto', error);
          return throwError(error);
        })
      );
    }
    updateProductoSignal (producto: IProducto): Observable<any>{
      return this.edit(producto.id, producto).pipe(
        tap((response: any) => {
          const updatedProducto = this.productoListSignal().map(u => u.id === producto.id ? response : u);
          this.productoListSignal.set(updatedProducto);
        }),
        catchError(error => {
          console.error('Error saving user', error);
          return throwError(error);
        })
      );
    }
    deleteProductoSignal (producto: IProducto): Observable<any>{
      return this.del(producto.id).pipe(
        tap((response: any) => {
          const updatedProducto = this.productoListSignal().filter(u => u.id !== producto.id);
          this.productoListSignal.set(updatedProducto);
        }),
        catchError(error => {
          console.error('Error saving user', error);
          return throwError(error);
        })
      );
    }
  }
  