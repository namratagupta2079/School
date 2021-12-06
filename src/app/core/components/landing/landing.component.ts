import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  columnLeft = 9;
  columnRight = 3;

  constructor() { }

  ngOnInit(): void {
  }

}
