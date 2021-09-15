import { Component, OnInit } from '@angular/core';
import { WookieService } from 'src/app/services/movies.service';
import { WookieMovie } from 'src/app/models/wookie-movie.model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movieList: WookieMovie[] = [];
  movieDetail: WookieMovie = new WookieMovie;

  constructor(
    private route: ActivatedRoute,
    private wookieService: WookieService
  ) { }

  ngOnInit(): void {
    this.wookieService.getMovies().subscribe((response) => {
      this.movieList = response.movies;
      const movieId = this.route.snapshot.url[1].path;
      this.movieDetail = this.movieList.filter((e) => e.id === movieId)[0];
      console.log(this.movieDetail);
    });
  }
}
