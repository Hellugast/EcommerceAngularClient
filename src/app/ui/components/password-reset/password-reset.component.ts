import { Component, OnInit } from '@angular/core';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent extends BaseComponent {

  constructor(spinner: NgxSpinnerService, private userAuthService: UserAuthService, private alertifyService: AlertifyService) {
    super(spinner)
  }

  passwordReset(email: string) {
    this.showSpinner(SpinnerTypes.BallAtom)
    this.userAuthService.passwordReset(email, () => {
      this.hideSpinner(SpinnerTypes.BallAtom)
      this.alertifyService.message("Şifre sıfırlama maili gönderildi", {
        messageType: MessageType.Success,
        position: Position.BottomLeft
      })
    })
  }

}
