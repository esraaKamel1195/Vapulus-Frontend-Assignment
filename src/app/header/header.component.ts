import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WookieService } from 'src/app/services/movies.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  search: FormGroup = new FormGroup({
    wookieSearch: new FormControl('')
  });

  constructor(
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  onSearch() {
    console.log(this.search.value.wookieSearch);
    if (this.search.value.wookieSearch) {
      this.route.navigate(['/search'], {
        queryParams: { searchTxt: this.search.value.wookieSearch },
      });
    }
  }
}
