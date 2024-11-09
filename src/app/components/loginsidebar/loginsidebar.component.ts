import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

interface UserDetails {
  name: string;
  username: string;
  password: string;
  id: string;
}

@Component({
  selector: 'app-login-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <!-- Backdrop -->
    <div
      *ngIf="isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
      (click)="onClose.emit()"
    ></div>

    <!-- Sidebar with Tailwind slide animation -->
    <div
      *ngIf="isOpen"
      class="fixed top-0 right-0 w-full sm:w-[600px] h-full bg-white z-50 transform transition-transform duration-300 ease-in-out"
      [ngClass]="{
        'translate-x-0': isOpen,
        'translate-x-full': !isOpen
      }"
    >
      <!-- Close button -->
      <button
        (click)="onClose.emit()"
        class="absolute top-4 left-4 text-gray-600 hover:text-gray-900"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div class="p-8 pt-16">
        <div class="flex items-center justify-between mb-6">
          <!-- Login Text -->
          <h1 class="text-3xl font-bold mb-4">Login</h1>

          <!-- <div class="mb-6">
          <span class="text-gray-600">or </span>
          <a href="#" class="text-orange-500 hover:text-orange-600">create an account</a>
        </div> -->

          <!-- Biryani Image -->
          <div
            class="w-24 h-24 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center"
          >
            <img
              src="assets/crusto.avif"
              alt="Biryani"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- Username and Password Inputs -->
        <div class="mb-6">
          <input
            type="text"
            placeholder="Username"
            class="my-2 w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
            [(ngModel)]="username"
          />
          <input
            type="password"
            placeholder="Password"
            class="my-2 w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
            [(ngModel)]="password"
          />
        </div>

        <!-- Login Button -->
        <button
          class="w-full bg-orange-500 text-white py-3 rounded font-medium hover:bg-orange-600 transition-colors"
          (click)="login()"
        >
          LOGIN
        </button>

        <!-- Terms and Privacy -->
        <p class="mt-4 text-sm text-gray-600">
          By clicking on Login, I accept the
          <a href="#" class="text-gray-900 hover:underline"
            >Terms & Conditions</a
          >
          &
          <a href="#" class="text-gray-900 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>`
  ,
})
export class LoginSidebarComponent {
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onLogin = new EventEmitter<string>();

  username: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  login() {
    this.http
      .get<UserDetails[]>(
        'https://672dd79bfd8979715643ea5d.mockapi.io/userdetails'
      )
      .subscribe((users) => {
        const user = users.find(
          (u) => u.username === this.username && u.password === this.password
        );
        if (user) {
          console.log('Login successful!');
          this.onLogin.emit(user.name); // Emit the user's name
          this.onClose.emit();
        } else {
          console.log('Invalid credentials');
          alert('Invalid credentials');
        }
      });
  }
}