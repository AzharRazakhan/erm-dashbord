import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Auth } from '../../core/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit{
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,private auth: Auth) {}
  
   ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  
  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;  
      this.auth.login(username, password).subscribe(user => {
        if (Array.isArray(user) && user.length === 0) alert('Invalid credentials')
        else this.router.navigate(['/dashbord'])
      })
    }
  }

}
