import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { param } from 'express-validator';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  user!: User

  constructor(public route: ActivatedRoute, private cookieService: CookieService, private authService: AuthService) {
    console.log("ResetPasswordComponent");
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.cookieService.set("token", params['token']);
    });
    this.resetForm = this.createFormGroup();
  }
  createFormGroup(): FormGroup {
    return new FormGroup({
      password: new FormControl("", [Validators.required, Validators.pattern("^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9]).{8,255})\\S$")]),
      confirmPassword: new FormControl("", [Validators.required, this.checkConfirmPassword]),
    });
  }
  checkConfirmPassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
    (control.value?.toString() === this.resetForm.value.toString()
      ? null : { noMatch: true })
  }
  reset(): void {
    this.authService.resetPassword(this.resetForm.value).subscribe(
      (res: any) => {
        console.log(res);


      });
    this.cookieService.delete("token");
  }


}
