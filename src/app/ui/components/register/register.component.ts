import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  frm: FormGroup;
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      userName: ["", [
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(5)
      ]],
      eMail: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.email
      ]],
      password: ["", [
        Validators.required
      ]],
      confirmPassword: ["", [
        Validators.required
      ]]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let password = group.get("password").value;
        let confirmPassword = group.get("confirmPassword").value;
        return password === confirmPassword ? null : { notSame: true };
      }
    })
  }

  get component() {
    return this.frm.controls;
  }

  submitted: boolean = false;
  onSubmit(data: User) {
    this.submitted = true;
    if (this.frm.invalid)
      return;
  }

}
