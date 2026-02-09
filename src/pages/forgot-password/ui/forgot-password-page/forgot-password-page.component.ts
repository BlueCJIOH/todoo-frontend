import { Component, OnInit } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password-page',
  imports: [
    ReactiveFormsModule
],
  standalone: true,
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.scss',
})
export class ForgotPasswordPageComponent implements OnInit {
  public forgotPasswordForm: FormGroup;
  public loginError: string | null = null;
  public isLoading: boolean = false;
  public isSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const emailFromLogin = params['email'];
      if (emailFromLogin) {
        this.forgotPasswordForm.patchValue({ email: emailFromLogin });
      }
    });
  }

  public onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.isLoading = true;
      this.loginError = null;
      const email = this.forgotPasswordForm.get('email')?.value;

      console.log('entered email:', { email });

      setTimeout(() => {
        this.isLoading = false;
        this.isSubmitted = true;
      }, 1500);
    }
  }

  public get email() {
    return this.forgotPasswordForm.get('email');
  }

  public goBackToLogin(): void {
    const email = this.forgotPasswordForm.get('email')?.value;
    if (email) {
      this.router.navigate(['/login'], {queryParams: {email: email}}).then();
     } else {
      this.router.navigate(['/login']).then();
    }
  }


}
