import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistaService } from 'src/app/features/regista/regista.service';
import { Film } from 'src/app/model/film';
import { Regista } from 'src/app/model/regista';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-film-create',
  templateUrl: './film-create.component.html',
  styleUrls: ['./film-create.component.css']
})
export class FilmCreateComponent implements OnInit {

  film: Film = new Film();
  registaId?: number;
  registi: Regista[] = [];
  errorMessage: string = '';

  constructor(private filmService: FilmService, private registaService: RegistaService, private router: Router) { }

  ngOnInit(): void {
    this.registaService.getRegisti().subscribe(registaListItem => this.registi = registaListItem);
  }

  save(filmForm: NgForm): void {
    console.log('sub ' + JSON.stringify(this.film));
    if (filmForm.valid) {
      // this.film.regista = { id: this.registaId };
      this.filmService.addFilm(this.film).subscribe({
        next: filmItem => {
          this.film = filmItem;
          this.errorMessage = '';
        },
        error: () => this.errorMessage = 'Attenzione! Inserimento fallito!',
        complete: () => {
          if (!this.errorMessage)
            this.router.navigate([`film/list`], { queryParams: { confirmMessage: 'Operazione effettuata correttamente.' } })
        }
      });
    } else
      this.errorMessage = 'Attenzione! Operazione fallita! Il form non è stato validato';
  }
}
