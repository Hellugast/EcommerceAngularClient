import { Injectable } from '@angular/core';
import { tick } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { SpinnerTypes } from 'src/app/base/base.component';
import { Token } from 'src/app/contracts/tokens/token';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   *
   */
  constructor(private jwtHelper: JwtHelperService, private router: Router, private toastrService: CustomToastrService, private spinnerService: NgxSpinnerService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this.spinnerService.show(SpinnerTypes.BallAtom)
    const token: string = localStorage.getItem("accessToken");

    // const decodeToken = this.jwtHelper.decodeToken(token);
    // const expirationDate: Date = this.jwtHelper.getTokenExpirationDate(token);
    let expired: boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch {
      expired = true;
    }

    if (!token || expired) {
      this.router.navigate(["login"], {
        queryParams: {
          returnUrl: state.url
        }
      });
      this.toastrService.message("Oturum açınız", "Yetkisiz erişim", {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight
      })
    }

    this.spinnerService.hide(SpinnerTypes.BallAtom)
    return true;
  }

}
