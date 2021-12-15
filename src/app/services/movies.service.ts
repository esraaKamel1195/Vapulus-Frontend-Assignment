import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WookieMovie } from 'src/app/models/wookie-movie.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class WookieService {
  constructor(private http: HttpClient) {}

  getMovies(): Observable<{movies: WookieMovie []}> {
    return this.http.get<{movies: WookieMovie []}>(`${environment.BASE_URL}`);
  }

  searchMovie(searchTxt: string): Observable<{movies: WookieMovie []}> {
    const url = `${environment.BASE_URL}` + '?q=' + searchTxt;
    return this.http.get<{movies: WookieMovie []}>(url);
  }
}
