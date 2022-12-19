import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from 'src/app/model/film';
import { Regista } from 'src/app/model/regista';
import { RegistaService } from '../../regista/regista.service';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-film-update',
  templateUrl: './film-update.component.html',
  styleUrls: ['./film-update.component.css']
})
export class FilmUpdateComponent implements OnInit {

  film: Film = new Film();
  registaId?: number;
  registi: Regista[] = [];
  errorMessage: string = '';
  confirmMessage: string = '';

  constructor(private filmService: FilmService, private registaService: RegistaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    //Caricamento dati del film
    let idParam = Number(this.route.snapshot.paramMap.get('id'));
    this.filmService.getFilm(idParam).subscribe({
      next: filmItem => {
        this.film = filmItem;
        console.log(JSON.stringify(filmItem))
      },
      error: err => this.errorMessage = err
    });

    //verifico presenza messaggio nei query params
    this.route
      .queryParams
      .subscribe(params => {
        // se non è presente il confirmMessage non faccio nulla
        this.confirmMessage = params['confirmMessage'] ? params['confirmMessage'] : '';
      });

    // Sottoscrizione dei registi
    this.registaService.getRegisti().subscribe(registaListItem => this.registi = registaListItem);
  }

  update(filmForm: NgForm): void {
    console.log('sub ' + JSON.stringify(this.film));
    if (filmForm.valid) {
      // this.film.regista = { id: this.registaId };
      this.filmService.updateFilm(this.film).subscribe({
        next: filmItem => {
          this.film = filmItem;
          this.errorMessage = '';
        },
        error: () => this.errorMessage = 'Attenzione! Aggiornamento fallito!',
        complete: () => {
          if (!this.errorMessage)
            this.router.navigate([`film/list`], { queryParams: { confirmMessage: 'Operazione effettuata correttamente.' } })
        }
      });
    } else
      this.errorMessage = 'Attenzione! Operazione fallita! Il form non è stato validato';
  }



}
