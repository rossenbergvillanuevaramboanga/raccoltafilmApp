import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmCreateComponent } from './film-create/film-create.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { FilmListComponent } from './film-list/film-list.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FilmService } from './film.service';
import { FilmDeleteComponent } from './film-delete/film-delete.component';
import { FilmUpdateComponent } from './film-update/film-update.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: 'list',
    component: FilmListComponent
  },
  {
    path: 'create',
    component: FilmCreateComponent
  },
  {
    path: 'edit/:id',
    component: FilmCreateComponent
  },
  {
    path: 'detail/:id',
    component: FilmDetailComponent
  },
  {
    path: 'delete/:id',
    component: FilmDeleteComponent
  },
  {
    path: 'update/:id',
    component: FilmUpdateComponent
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
]

@NgModule({
  declarations: [
    FilmCreateComponent,
    FilmDetailComponent,
    FilmListComponent,
    FilmDeleteComponent,
    FilmUpdateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [
    FilmService
  ]
})
export class FilmModule { }
