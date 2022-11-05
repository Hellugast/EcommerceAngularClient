import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private userAuthService: UserAuthService,
    private activatedRoute: ActivatedRoute, private alertifyService: AlertifyService,
    private userService: UserService, private router: Router) {
    super(spinner)
  }


  state: any

  ngOnInit(): void {
    this.showSpinner(SpinnerTypes.BallAtom)
    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId: string = params["userId"]
        const resetToken: string = params["resetToken"]
        this.state = await this.userAuthService.verifyResetToken(resetToken, userId, () => {
          this.state = true;
          this.hideSpinner(SpinnerTypes.BallAtom)
        })
      }
    })
  }

  updatePassword(password: string, passwordConfirm: string) {
    this.showSpinner(SpinnerTypes.BallAtom);
    if (password != passwordConfirm) {
      this.alertifyService.message("Şifreleri doğrulayınız", {
        messageType: MessageType.Error,
        position: Position.BottomRight
      });
      this.hideSpinner(SpinnerTypes.BallAtom)
      return
    }

    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId: string = params["userId"]
        const resetToken: string = params["resetToken"]
        await this.userService.updatePassword(userId, resetToken, password, passwordConfirm,
          () => {
            this.alertifyService.message("Şifre güncellendi", {
              messageType: MessageType.Success,
              position: Position.BottomRight
            })
            this.router.navigate(["/login"])
          },
          error => {
            console.log(error)
          })
        this.hideSpinner(SpinnerTypes.BallAtom)
      }
    });

  }

}
