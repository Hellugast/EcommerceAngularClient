import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { AuthService } from './auth.service';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomToastrService, private userAuthService: UserAuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.toastrService.message("Yetkiniz bulunmamaktadır", "Yetkisiz işlem", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomRight
          })
          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken")).then(data => {

          });

          break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Sunucuya erişilemedi", "Sunucu hatası", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomRight
          })
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Geçersiz istek", "Geçersiz istek", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomRight
          })
          break;
        case HttpStatusCode.NotFound:
          this.toastrService.message("Sayfa bulunamadı", "Sayfa bulunamadı", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomRight
          })
          break;
        default:
        case HttpStatusCode.NotFound:
          this.toastrService.message("Bir hata ile karşılaşıldı", "Hata!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomRight
          })
          break;
      }
      return of(error);
    }));
  }
}
