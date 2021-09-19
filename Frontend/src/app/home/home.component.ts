import { Component, OnInit, HostListener  } from '@angular/core';
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
    private wookieService: WookieService,
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

  // Responsive Grid Tile 1
  columnNum = 4; //initial count
  tileSize: number = 300; //one tile should have this width
  // Responsive Grid Tile step 2
  setColNum(){
    let width: any = window.document.getElementById('gridList')?.offsetWidth;
    this.columnNum = Math.trunc(width/this.tileSize);
  }
  // Responsive Grid Tile step 3
  //calculating upon loading
  async ngAfterViewInit() {
    await this.delay(100);
    this.setColNum();
  }
  // Responsive Grid Tile step 4
  //recalculating upon browser window resize
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setColNum();
  }

  private delay(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)); }
}
