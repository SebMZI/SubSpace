import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  static MAX_STARS = 30;

  ngOnInit() {
    this.setStars();
  }

  private setStars() {
    const STAR_CONTAINER = document.querySelector(".star-container");
    if(!STAR_CONTAINER) return;

    const SCREEN_WIDTH = window.innerWidth;
    const SCREEN_HEIGHT = window.innerHeight;

    for(let i = 0; i < Dashboard.MAX_STARS; i++) {
      const RANDOM_HEIGHT = this.clamp(0, SCREEN_HEIGHT, Math.random() * SCREEN_HEIGHT);
      const RANDOM_WIDTH = this.clamp(0, SCREEN_WIDTH, Math.random() * SCREEN_WIDTH);
      const RANDOM_SIZE = this.clamp(8, 16, Math.random() * 16);
      const RANDOM_OPACITY = this.clamp(20, 100, Math.random() * 100);

      const STAR = document.createElement("span");
      STAR.classList.add("star");
      const STAR_IMG = document.createElement("img");
      STAR_IMG.src = "./star.svg";

      STAR.style.width = RANDOM_SIZE + "px";
      STAR.style.height = RANDOM_SIZE + "px";
      STAR.style.opacity = RANDOM_OPACITY + "%";
      STAR.style.position = "absolute";
      STAR.style.top = RANDOM_HEIGHT + "px";
      STAR.style.left = RANDOM_WIDTH + "px";

      STAR.appendChild(STAR_IMG);
      STAR_CONTAINER.appendChild(STAR);
    }
  }

  private clamp(min: number, max: number, random: number) {
    return Math.min(Math.max(random, min), max);
  }
}
