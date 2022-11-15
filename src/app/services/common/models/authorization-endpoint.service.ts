import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationEndpointService {

  constructor(private httpClientService: HttpClientService) { }

  async assignRoleEndpoint(roles: string[], code: string, menu: string, successCallback?: () => void, errorCallback?: (error) => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "AuthorizationEndPoints",
    }, {
      roles: roles,
      code: code,
      menu: menu
    })

    const promiseData = observable.subscribe({
      next: successCallback,
      error: errorCallback,
    })

    await promiseData;
  }

  async getRolesToEndpoint(code: string, menu: string, successCallback?: () => void, errorCallback?: (error) => void): Promise<string[]> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "AuthorizationEndPoints",
      action: "GetRolesToEndpoint"
    }, {
      code: code,
      menu: menu
    })

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallback)
      .catch(errorCallback)

    return (await promiseData).roles;
  }


}
