import { Injectable } from '@angular/core';
import { first, firstValueFrom, observable, Observable } from 'rxjs';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update_basket_item';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClientService: HttpClientService) { }
  async get(): Promise<List_Basket_Item[]> {
    const observable: Observable<List_Basket_Item[]> = this.httpClientService.get({
      controller: "basket",
    });

    return await firstValueFrom(observable);
  }

  async add(basketItem: Create_Basket_Item): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "basket"
    }, basketItem)

    await firstValueFrom(observable);

  }

  async updateQuantity(basketItem: Update_Basket_Item): Promise<void> {
    const observable: Observable<any> = this.httpClientService.put({
      controller: "basket"
    }, basketItem)

    await firstValueFrom(observable);
  }

  async remove(basketItemId: string) {
    const observable: Observable<any> = this.httpClientService.delete({
      controller: "basket"
    }, basketItemId)

    await firstValueFrom(observable);
  }


}
