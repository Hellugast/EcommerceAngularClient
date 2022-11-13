import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(private roleService: RoleService, spinner: NgxSpinnerService, private alertify: AlertifyService) { super(spinner); }

  ngOnInit(): void {
  }

  @Output() createdRole: EventEmitter<string> = new EventEmitter();
  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action: "upload",
    controller: "products",
    explanation: "Resimleri seçin",
    isAdminPage: true,
    accept: ".png, .jpg, jpeg"
  }

  create(name: HTMLInputElement) {
    this.showSpinner(SpinnerTypes.BallAtom)

    this.roleService.create(name.value, () => {
      this.hideSpinner(SpinnerTypes.BallAtom);
      this.alertify.message("Rol başarıyla eklendi", {
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.createdRole.emit(name.value);
    }, errorMessage => {
      this.alertify.message(errorMessage,
        {
          messageType: MessageType.Error,
          position: Position.TopRight
        })
    });
  }

}
