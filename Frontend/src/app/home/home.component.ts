import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WookieService } from 'src/app/services/movies.service';
import { WookieMovie } from 'src/app/models/wookie-movie.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  movieList: WookieMovie [] = [];
  allGenreList: string [] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private wookieService: WookieService
  ) { }

  ngOnInit(): void {
    if( !this.route.url.includes('search')) {
      this.wookieService.getMovies().subscribe((response) => {
        this.allGenreList = this.getAllGenres(response.movies);
        this.movieList = response.movies;
      });
    }
    else {
      this.activatedRoute.queryParams.subscribe((params) => {
        this.wookieService
          .searchMovie(params['searchTxt'])
          .subscribe((response) => {
            this.movieList = response.movies;
          });
      });
    }
  }

  getAllGenres(movieList: WookieMovie [] ) {
    let genreList:  any []= [];
    movieList.forEach((movie: WookieMovie ) => {
      genreList = Array.from(new Set(genreList.concat( movie.genres )));
    });
    return genreList;
  }

}
