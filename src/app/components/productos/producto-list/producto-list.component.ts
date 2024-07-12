import { Component, effect, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { IProducto, IAuthority } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../modal/modal.component';
import { ProductoFormComponent } from '../producto-form/producto-form.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';


@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    ModalComponent,
    ProductoFormComponent,
    MatSnackBarModule
  ],
  templateUrl: './producto-list.component.html',
  styleUrl: './producto-list.component.scss'
})

export class ProductoListComponent implements OnChanges {
  @Input() areActionsAvailable: boolean = false;
  public search: String = '';
  
  public productoList: IProducto[] = [];
  private service = inject(ProductoService);
  private snackBar = inject(MatSnackBar);
  public currentProducto: IProducto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    cantidadEnStock: 0,
    categoria: {id: 0, nombre: ''}

    
  };
  
  constructor() {
    this.service.getAllSignal();
    effect(() => {      
      this.productoList = this.service.producto$();
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['areActionsAvailable']) {
      console.log('areActionsAvailable', this.areActionsAvailable);
    }
  }

  showDetail(producto: IProducto, modal: any) {
    this.currentProducto = {...producto}; 
    modal.show();
  }

  deleteProducto(producto: IProducto) {
    this.service.deleteProductoSignal(producto).subscribe({
      next: () => {
        this.snackBar.open('Producto deleted', 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 5 * 1000,
        });
      },
      error: (error: any) => {
        this.snackBar.open('Error deleting product', 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    })
  }

}
