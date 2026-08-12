import {Component, inject, signal} from '@angular/core';
import {email, form, FormField, minLength, required, SchemaPath, submit} from '@angular/forms/signals';
import {Register} from '../interfaces/register';
import {Auth} from '../services/auth/auth';
import {firstValueFrom} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [
    FormField
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  static MAX_STARS = 30;
  private authService = inject(Auth);
  private router = inject(Router);

  registerModel = signal<Register>({
    username: "",
    email: "",
    password: "",
  })

  registerForm = form(this.registerModel, (schemaPath) => {
    required(schemaPath.username, {message: "Username is required"});
    required(schemaPath.email, {message: "Email is required"});
    email(schemaPath.email, {message: "Email is invalid"});
    required(schemaPath.password, {message: "Password is required"});
    minLength(schemaPath.password, 8, {message: "Password must be at least 8 characters"});
  })


  ngOnInit() {
    this.setStars();
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    try {
      const response = await firstValueFrom(this.authService.registerUser(this.registerModel()));
      console.log(response);

      if(response.ok) {
        // TODO - AFFICHER UN MESSAGE PUIS REDIRECT
        await this.router.navigate(["/signin"]);
      }
    }catch (e) {
      console.error(e)
    }
  }


  private setStars() {
    const STAR_CONTAINER = document.querySelector(".star-container");
    if(!STAR_CONTAINER) return;

    const SCREEN_WIDTH = window.innerWidth;
    const SCREEN_HEIGHT = window.innerHeight;

    for(let i = 0; i < SignUp.MAX_STARS; i++) {
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
