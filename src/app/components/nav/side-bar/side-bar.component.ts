import { Component, OnInit } from '@angular/core';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  activeMenu = false;
  activeButton = false;

  constructor() {

  }

  ngOnInit(): void {
  }

  toggleMenu () {
    this.activeMenu = !this.activeMenu;
    this.activeButton = !this.activeButton;
  }


}
