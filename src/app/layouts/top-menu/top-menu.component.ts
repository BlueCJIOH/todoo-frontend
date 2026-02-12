import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-top-menu',
  imports: [NgOptimizedImage],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss',
})
export class TopMenuComponent {
  public userProfileIcon: string = "assets/icons/user-profile-blue.svg";

  public onHover(isHovering: boolean): void {
    this.userProfileIcon = isHovering 
    ? 'assets/icons/user-profile-lime.svg' 
    : 'assets/icons/user-profile-blue.svg';
  }
}
