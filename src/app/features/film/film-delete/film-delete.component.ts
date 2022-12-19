import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from 'src/app/model/film';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-film-delete',
  templateUrl: './film-delete.component.html',
  styleUrls: ['./film-delete.component.css']
})
export class FilmDeleteComponent implements OnInit {


  constructor(private route: ActivatedRoute, private filmService: FilmService,
    private router: Router) { }

  selectedFilm?: Film;
  errorMessage: string = '';
  confirmMessage: string = '';

  ngOnInit(): void {
    let idParam = Number(this.route.snapshot.paramMap.get('id'));
    this.filmService.getFilm(idParam).subscribe({
      next: filmItem => {
        this.selectedFilm = filmItem;
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
  }

  delete(): void {
    let idParam = Number(this.route.snapshot.paramMap.get('id'));
    this.filmService.deleteFilm(idParam).subscribe({
      next: boolean => {
        this.errorMessage = '';
      },
      error: () => this.errorMessage = 'Attenzione! Eliminazione fallita!',
      complete: () => {
        if (!this.errorMessage)
          this.router.navigate([`film/list`], { queryParams: { confirmMessage: 'Eliminazione effettuata correttamente.' } })
      }
    })
  }

}

