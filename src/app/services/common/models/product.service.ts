import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from '../../../contracts/create_product';
import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/list_product';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "products"
    }, product).subscribe(result => {
      successCallBack();
    }, (errorResponse: HttpErrorResponse) => {
      const _error = errorResponse.error;
      let errorMessage = "";

      // ÖNEMLİ NOT: ÇÖZÜLMESİ GEREKEN BİR OBJ-FOREACH SORUNU VAR

      _error.errors.Name.forEach(element => {
        errorMessage += `${element}<br>`
      });

      _error.errors.Stock.forEach(element => {
        errorMessage += `${element}<br>`
      });

      _error.errors.Price.forEach(element => {
        errorMessage += `${element}<br>`
      });

      errorCallBack(errorMessage);
      debugger;
    });
  }

  //   const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
  //   let errorMessage = "";
  //   [_error].forEach((v, index) => {
  //     v.forEach((_v,_index) => {
  //       errorMessage += `${_v}<br>`
  //     })
  //   });
  //   console.log(_error)
  //   errorCallBack(errorMessage);
  //    });
  // }

  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?:
    (errorMessage: string) => void): Promise<{ totalCount: number; products: List_Product[] }> {
    const promiseData: Promise<{ totalCount: number; products: List_Product[] }> = this.httpClientService.get<{ totalCount: number; products: List_Product[] }>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    }).toPromise();
    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }

  async delete(id: string) {
    const deleteObs: Observable<any> = this.httpClientService.delete<any>({
      controller: "products"

    }, id);
    await firstValueFrom(deleteObs);
  }







}
