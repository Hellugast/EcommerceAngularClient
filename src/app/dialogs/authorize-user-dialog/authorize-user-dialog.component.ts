import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerTypes } from 'src/app/base/base.component';
import { List_User } from 'src/app/contracts/users/list_user';
import { RoleService } from 'src/app/services/common/models/role.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-authorize-user-dialog',
  templateUrl: './authorize-user-dialog.component.html',
  styleUrls: ['./authorize-user-dialog.component.scss']
})
export class AuthorizeUserDialogComponent extends BaseDialog<AuthorizeUserDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<AuthorizeUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private roleService: RoleService,
    private userService: UserService, private spinner: NgxSpinnerService) {
    super(dialogRef)
  }

  roles: { datas: List_User[], totalCount: number };
  assignedRoles: string[];
  listRoles: { name: string, selected: boolean }[]
  async ngOnInit() {
    this.spinner.show(SpinnerTypes.BallAtom)
    this.assignedRoles = await this.userService.GetUserRoles(this.data, () => this.spinner.hide(SpinnerTypes.BallAtom));

    this.roles = await this.roleService.getRoles(-1, -1);

    this.listRoles = this.roles.datas.map((r: any) => {
      return {
        name: r.name,
        selected: this.assignedRoles?.indexOf(r.name) > -1
      }
    })
  }

  assignRoles(rolesComponent: MatSelectionList) {
    const roles: string[] = rolesComponent.selectedOptions.selected.map(o => o._text.nativeElement.innerText)
    this.spinner.show(SpinnerTypes.BallAtom)
    this.userService.assignRoleToUser(this.data, roles,
      () => {
        this.spinner.hide(SpinnerTypes.BallAtom)
      }, error => {

      })
  }

}
