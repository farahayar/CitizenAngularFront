import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-visiteur',
  templateUrl: './nav-visiteur.component.html',
  styleUrls: ['./nav-visiteur.component.scss']
})
export class NavVisiteurComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToInscription() {
    this.router.navigateByUrl('/inscription');
  }
  goToLogin() {
    this.router.navigateByUrl('/');
  }
  map() {
    this.router.navigateByUrl('/visiteur');
  }
  posts() {
    this.router.navigateByUrl('/in/posts');
  }
}
