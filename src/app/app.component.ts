import { Component, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { Position } from './services/admin/alertify.service';
import { AuthService } from './services/common/auth.service';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { HttpClientService } from './services/common/http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(DynamicLoadComponentDirective, { static: true })
  dynamicLoadComponentDirective: DynamicLoadComponentDirective

  constructor(public authService: AuthService, private toastrService: CustomToastrService, private router: Router, private httpClientService: HttpClientService, private dynamicLoadComponentService: DynamicLoadComponentService) {

    this.authService.identityCheck();

  }

  signOut() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    this.authService.identityCheck();
    this.router.navigate([""])
    this.toastrService.message("Oturum kapatıldı", "Oturum kapatıldı", {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight
    })
  }

  loadComponent() {
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent, this.dynamicLoadComponentDirective.viewContainerRef)
  }

}
