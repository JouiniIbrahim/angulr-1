import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';  // Import ActivatedRoute
import { AllMyServicesService } from '../Services/all-my-services.service';
  
@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent implements OnInit {
  confirmForm: FormGroup;
  actKey: string | null = null;  

  constructor(
    private fb: FormBuilder,
    private Service: AllMyServicesService,
    private router: Router,
    private route: ActivatedRoute  
  ) {
    this.confirmForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordsMatch('password', 'confirmPassword')
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.actKey = params['act_key'];  
      console.log('el key:', this.actKey);
    });
  }

  passwordsMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (confirmPasswordControl?.errors && !confirmPasswordControl.errors['passwordMismatch']) {
        return;
      }

      if (passwordControl?.value !== confirmPasswordControl?.value) {
        confirmPasswordControl?.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl?.setErrors(null);
      }
    };
  }

  onSubmit(): void {
    if (this.confirmForm.valid) {
      const formValues = this.confirmForm.value;
      const confirmationData = {
        email: formValues.email,
        password: formValues.password,
        activation_key: this.actKey  
      };

      console.log("Confirmation Data:", confirmationData);

      this.Service.confirmAccount(confirmationData).subscribe(
        (response) => {
          console.log('Account confirmed successfully', response);
          this.router.navigate(['user']);
        },
        (error) => {
          console.error('Error confirming account', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  get email() {
    return this.confirmForm.get('email');
  }

  get password() {
    return this.confirmForm.get('password');
  }

  get confirmPassword() {
    return this.confirmForm.get('confirmPassword');
  }
}
