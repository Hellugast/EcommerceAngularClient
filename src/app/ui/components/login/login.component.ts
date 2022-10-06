import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { TokenResponse } from 'src/app/contracts/tokens/tokenResponse';
import { User } from 'src/app/entities/user';
import { AuthService } from 'src/app/services/common/auth.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userService: UserService, spinner: NgxSpinnerService,
    private authService: AuthService, private activatedRoute: ActivatedRoute,
    private router: Router, private socialAuthService: SocialAuthService, httpClientService: HttpClientService) {
    super(spinner)
    spinner.show(SpinnerTypes.BallAtom)
    socialAuthService.authState.subscribe(async (user: SocialUser) => {

      await userService.googleLogin(user, () => {
        this.authService.identityCheck();
        this.hideSpinner(SpinnerTypes.BallAtom)
      });
    });
  }

  ngOnInit(): void {
  }

  async login(userName: string, password: string) {
    this.showSpinner(SpinnerTypes.BallAtom);
    await this.userService.login(userName, password, () => {
      this.authService.identityCheck(),        // ------------------------
        this.activatedRoute.queryParams.subscribe(params => {
          const returnUrl: string = params["returnUrl"];
          if (returnUrl)
            this.router.navigate([returnUrl]);
        })
      this.hideSpinner(SpinnerTypes.BallAtom)
    });
  }

}
