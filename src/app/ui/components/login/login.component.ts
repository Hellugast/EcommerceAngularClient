import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userService: UserService, spinner: NgxSpinnerService) {
    super(spinner)
  }

  ngOnInit(): void {
  }

  async login(userName: string, password: string) {
    this.showSpinner(SpinnerTypes.BallAtom);
    await this.userService.login(userName, password, () => this.hideSpinner(SpinnerTypes.BallAtom));
  }

}
