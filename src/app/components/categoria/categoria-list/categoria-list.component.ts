import { Component, effect, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { ICategoria } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../modal/modal.component';
import { CategoriaFormComponent } from '../categoria-form/categoria-form.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';


@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    ModalComponent,
    CategoriaFormComponent,
    MatSnackBarModule
  ],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.scss'
})
export class CategoriaListComponent implements OnChanges {
  @Input() areActionsAvailable: boolean = false;
  public search: String = '';
  public categoriaList: ICategoria[] = [];
  private service = inject(CategoriaService);
  private snackBar = inject(MatSnackBar);
  public currentCategoria: ICategoria = {
    nombre: '',
    descripcion: '',
    
  };
  
  constructor() {
    this.service.getAllSignal();
    effect(() => {      
      this.categoriaList = this.service.categorias$();
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['areActionsAvailable']) {
      console.log('areActionsAvailable', this.areActionsAvailable);
    }
  }

  showDetail(categoria: ICategoria, modal: any) {
    this.currentCategoria = {...categoria}; 
    modal.show();
  }

  deleteCategoria(categoria: ICategoria) {
    this.service.deleteCategoriaSignal(categoria).subscribe({
      next: () => {
        this.snackBar.open('Category deleted', 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 5 * 1000,
        });
      },
      error: (error: any) => {
        this.snackBar.open('Error deleting category', 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    })
  }

}
