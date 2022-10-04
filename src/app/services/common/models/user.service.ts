import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, observable, Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService) { }

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: "users",
    }, user);

    return await firstValueFrom(observable) as Create_User;
  }

  async login(userName: string, password: string, callBackFunction?: () => void): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "users",
      action: "login"
    }, { userName, password })

    await firstValueFrom(observable);
    callBackFunction();

  }
}
