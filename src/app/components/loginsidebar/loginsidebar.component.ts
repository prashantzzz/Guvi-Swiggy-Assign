import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  template: `
    <!-- Backdrop -->
    <div 
      *ngIf="isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
      (click)="onClose.emit()"
    ></div>

    <!-- Sidebar -->
    <div 
      class="fixed top-0 right-0 w-full sm:w-[600px] h-full bg-white z-50 transform transition-transform duration-300 ease-in-out"
      [ngClass]="isOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <!-- Close button -->
      <button 
        (click)="onClose.emit()"
        class="absolute top-4 left-4 text-gray-600 hover:text-gray-900"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Login Content -->
      <div class="p-8 pt-16">
        <h1 class="text-3xl font-bold mb-2">Login</h1>
        
        <div class="mb-6">
          <span class="text-gray-600">or </span>
          <a href="#" class="text-orange-500 hover:text-orange-600">create an account</a>
        </div>

        <!-- Biryani Image -->
        <div class="flex justify-center mb-4">
          <div class="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
            <img 
              src="assets/crusto.avif" 
              alt="Biryani"
              class="w-16 h-16 object-cover"
            />
          </div>
        </div>

        <!-- Phone Input -->
        <div class="mb-6">
          <input class="m-4"
            type="name"
            placeholder="Username"
            class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
            [(ngModel)]="username"
          />
          <input  class="m-4"
            type="password"
            placeholder="Password"
            class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
            [(ngModel)]="password"
          />
        </div>

        <!-- Login Button -->
        <button class="w-full bg-orange-500 text-white py-3 rounded font-medium hover:bg-orange-600 transition-colors">
          LOGIN
        </button>

        <!-- Terms and Privacy -->
        <p class="mt-4 text-sm text-gray-600">
          By clicking on Login, I accept the 
          <a href="#" class="text-gray-900 hover:underline">Terms & Conditions</a>
          & 
          <a href="#" class="text-gray-900 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  `
})
export class LoginSidebarComponent {
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  username: string = '';
  password: string = '';
}