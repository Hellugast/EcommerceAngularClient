import { SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, observable, Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Token } from 'src/app/contracts/tokens/token';
import { TokenResponse } from 'src/app/contracts/tokens/tokenResponse';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { MessageType } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: "users",
    }, user);

    return await firstValueFrom(observable) as Create_User;
  }

}