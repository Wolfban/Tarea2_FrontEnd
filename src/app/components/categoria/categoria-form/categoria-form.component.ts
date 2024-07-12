import { Component, Input, inject } from '@angular/core';
import { IFeedBackMessage, ICategoria, IFeedbackStatus} from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule
  ],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.scss'
})
export class CategoriaFormComponent {
  @Input() title!: string;
  @Input() categoria: ICategoria = {
    nombre: '',
    descripcion: '',
    
  };
  @Input() action: string = 'add'
  service = inject(CategoriaService);
  feedbackMessage: IFeedBackMessage = {type: IFeedbackStatus.default, message: ''};

  handleAction (form: NgForm) {
    if (form.invalid) {
      Object.keys(form.controls).forEach(controlName => {
        form.controls[controlName].markAsTouched();
      });
      return;
    } else {
      this.service[ this.action == 'add' ? 'saveCategoriaSignal': 'updateCategoriaSignal'](this.categoria).subscribe({
        next: () => {
          this.feedbackMessage.type = IFeedbackStatus.success;
          this.feedbackMessage.message = `Categoria successfully ${this.action == 'add' ? 'added': 'updated'}`
        },
        error: (error: any) => {
          this.feedbackMessage.type = IFeedbackStatus.error;
          this.feedbackMessage.message = error.message;
        }
      })
    }
  }
}
