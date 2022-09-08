import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Position } from './services/admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EcommerceAngularClient';
  constructor(private toastService: CustomToastrService) {
    toastService.message("toast test", "bab", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.BottomRight
    })
  }
}
