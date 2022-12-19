import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
//import { RegistaCreateComponent } from './features/regista/regista-create/regista-create.component';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () => import('./features/welcome/welcome.module').then(m => m.WelcomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'regista',
    loadChildren: () => import('./features/regista/regista.module').then(m => m.RegistaModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'film',
    loadChildren: () => import('./features/film/film.module').then(m => m.FilmModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./core/auth/login/login.module').then(m => m.AuthModule),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '*', redirectTo: '/welcome' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
