import { Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { ICategoria } from '../interfaces';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService extends BaseService<ICategoria> {
    protected override source: string = 'categoria';
    private categoriaListSignal = signal<ICategoria[]>([]);
    get categorias$() {
      return this.categoriaListSignal;
    }
    getAllSignal(): Observable<ICategoria[]> {
      return this.findAll().pipe(
        tap((response: any) => {
          response.reverse();
          this.categoriaListSignal.set(response);
        }),
        catchError(error => {
          console.error('Error fetching categories', error);
          return throwError(error);
        })
      );
    }
    saveCategoriaSignal (categoria: ICategoria): Observable<any>{
      return this.add(categoria).pipe(
        tap((response: any) => {
          this.categoriaListSignal.update( categorias => [response, ...categorias]);
        }),
        catchError(error => {
          console.error('Error saving category', error);
          return throwError(error);
        })
      );
    }
    updateCategoriaSignal (categoria: ICategoria): Observable<any>{
      return this.edit(categoria.id, categoria).pipe(
        tap((response: any) => {
          const updatedCategorias = this.categoriaListSignal().map(u => u.id === categoria.id ? response : u);
          this.categoriaListSignal.set(updatedCategorias);
        }),
        catchError(error => {
          console.error('Error saving category', error);
          return throwError(error);
        })
      );
    }
    deleteCategoriaSignal (categoria: ICategoria): Observable<any>{
      return this.del(categoria.id).pipe(
        tap((response: any) => {
          const updatedCategorias = this.categoriaListSignal().filter(u => u.id !== categoria.id);
          this.categoriaListSignal.set(updatedCategorias);
        }),
        catchError(error => {
          console.error('Error saving category', error);
          return throwError(error);
        })
      );
    }
  }
  