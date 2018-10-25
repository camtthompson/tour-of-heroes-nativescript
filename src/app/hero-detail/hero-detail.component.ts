import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '*',
        opacity: 1,
        margin: '0 0 15px 0',
        padding: '15px'
      })),
      state('closed', style({
        height: '0px',
        opacity: 0,
        overflow: 'hidden',
        margin: 0,
        padding: '0 15px'
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  editMode: boolean = false;
  isOpen: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);

    this.heroService.getValue()
      .subscribe(
        data => this.hero.apiResponseValue = data.name,
        error => console.log("failed", error)
      );
    /*
    this.heroService.getPDF()
    .subscribe(
      data => console.log(data),
      error => console.log("error", error)
    )*/
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {

  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    console.log(this.hero);
  }

  toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }
}
