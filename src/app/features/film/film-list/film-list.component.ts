import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Film } from 'src/app/model/film';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

  filmList?: Film[];
  sub?: Subscription;
  confirmMessage: string = '';

  constructor(private filmService: FilmService, private route: ActivatedRoute, public authService: AuthService) { }

  ngOnInit(): void {
    this.sub = this.filmService.getFilms().subscribe(filmListItem => this.filmList = filmListItem);

    //verifico presenza messaggio nei query params
    this.route
      .queryParams
      .subscribe(params => {
        // se non è presente il confirmMessage non faccio nulla
        this.confirmMessage = params['confirmMessage'] ? params['confirmMessage'] : '';
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
