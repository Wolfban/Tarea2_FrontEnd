import { Component, Input, OnInit, inject } from '@angular/core';
import { ICategoria, IFeedBackMessage,IFeedbackStatus, IProducto} from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule
  ],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.scss'
})
export class ProductoFormComponent{
  @Input() title!: string;
  @Input() producto: IProducto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    cantidadEnStock: 0,
    categoria: {id: 0, nombre: ''}
  };
  @Input() action: string = 'add'
  service = inject(ProductoService);
  categoriaService = inject(CategoriaService);

  categorias: ICategoria[] = [];
  feedbackMessage: IFeedBackMessage = {type: IFeedbackStatus.default, message: ''};

  ngOnInit() {
    this.categoriaService.getAllSignal().subscribe({
      next: (categorias: ICategoria[]) => {
        this.categorias = categorias;
      },
      error: (error: any) => {
        console.error('Error fetching categories', error);
      }
    });
  }
  handleAction (form: NgForm) {
    if (form.invalid) {
      Object.keys(form.controls).forEach(controlName => {
        form.controls[controlName].markAsTouched();
      });
      return;
    } else {
      this.service[ this.action == 'add' ? 'saveProductoSignal': 'updateProductoSignal'](this.producto).subscribe({
        next: () => {
          this.feedbackMessage.type = IFeedbackStatus.success;
          this.feedbackMessage.message = `Producto successfully ${this.action == 'add' ? 'added': 'updated'}`
        },
        error: (error: any) => {
          this.feedbackMessage.type = IFeedbackStatus.error;
          this.feedbackMessage.message = error.message;
        }
      })
    }
  }
}
