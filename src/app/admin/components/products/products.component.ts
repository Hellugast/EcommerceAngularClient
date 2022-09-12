import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private httpClientService: HttpClientService) { }

  ngOnInit(): void {

    // this.httpClientService.get<Create_Product[]>({
    //   controller: "products"
    // }).subscribe(data => console.log(data));


    // this.httpClientService.post({
    //   controller: "products"
    // }, {
    //   name: "kalem",
    //   stock: 100,
    //   price: 15

    // }).subscribe();


    // this.httpClientService.put({
    //   controller: "products"
    // }, {
    //   id: "07cfbe25-6477-4a6b-8388-168d536074ee",
    //   name: "renkli kağıt",
    //   stock: 300,
    //   price: 9

    // }).subscribe()


    // this.httpClientService.delete({
    //   controller: "products"
    // },
    //   "3d783f53-7cb5-4c19-8c87-1ca5086e039c"
    // ).subscribe()

// this.httpClientService.get({
//   fullEndPoint: "https://jsonplaceholder.typicode.com/posts"
// }).subscribe(data => console.log(data))

  }

}
