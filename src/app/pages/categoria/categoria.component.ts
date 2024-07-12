import { Component, inject, OnInit } from '@angular/core';
import { CategoriaFormComponent } from '../../components/categoria/categoria-form/categoria-form.component';
import { CategoriaListComponent } from '../../components/categoria/categoria-list/categoria-list.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    CategoriaListComponent,
    CategoriaFormComponent,
    LoaderComponent,
    ModalComponent
  ],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent  implements OnInit{
  public categoriaService: CategoriaService = inject(CategoriaService);
  public route: ActivatedRoute = inject(ActivatedRoute);
  public areActionsAvailable: boolean = false;
  public authService: AuthService =  inject(AuthService);
  public routeAuthorities: string[] =  [];

  ngOnInit(): void {
    this.categoriaService.getAllSignal();
    this.route.data.subscribe( data => {
      this.routeAuthorities = data['authorities'] ? data['authorities'] : [];
      this.areActionsAvailable = this.authService.areActionsAvailable(this.routeAuthorities);
    });
  }
}




