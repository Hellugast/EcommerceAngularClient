import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/base_url';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { List_Product } from 'src/app/contracts/list_product';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private fileService: FileService, private basketService: BasketService, spinner: NgxSpinnerService, private toastrService: CustomToastrService) {
    super(spinner)
  }

  currentPageNo: number;
  totalCount: number;
  totalPageCount: number;
  pageSize: number = 15;
  pageList: number[] = [];
  baseUrl: BaseUrl;

  products: List_Product[];
  async ngOnInit() {

    this.baseUrl = await this.fileService.getBaseStorageUrl();

    this.activatedRoute.params.subscribe(async params => {

      this.currentPageNo = parseInt(params["pageNo"] ?? 1);

      const data: { totalCount: number, products: List_Product[] } = await this.productService.read(this.currentPageNo - 1, this.pageSize,
        () => {

        },
        errorMessage => {

        });
      this.products = data.products;
      this.products = this.products.map<List_Product>(p => {
        const listProduct: List_Product = {
          id: p.id,
          name: p.name,
          price: p.price,
          stock: p.stock,
          createdDate: p.createdDate,
          updatedDate: p.updatedDate,
          imagePath: `${p.productImageFiles.length ? p.productImageFiles.find(p => p.showcase).path : ""}`,
          productImageFiles: p.productImageFiles
        }
        return listProduct;
      });


      this.totalCount = data.totalCount;
      this.totalPageCount = Math.ceil(this.totalCount / this.pageSize);

      this.pageList = [];

      if (this.totalPageCount >= 7) {

        if (this.currentPageNo - 3 <= 0) {
          for (let i = 1; i <= 7; i++) {
            this.pageList.push(i);
          }
        }
        else if (this.currentPageNo + 3 >= this.totalPageCount) {
          for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++) {
            this.pageList.push(i);
          }
        }
        else {
          for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++) {
            this.pageList.push(i);
          }
        }

      }
      else {

        for (let i = 1; i <= this.totalPageCount; i++) {
          this.pageList.push(i);
        }

      }
    })

  }

  async addToBasket(product: List_Product) {
    this.showSpinner(SpinnerTypes.BallAtom)
    let _basketItem: Create_Basket_Item = new Create_Basket_Item();
    _basketItem.productId = product.id;
    _basketItem.quantity = 1;
    await this.basketService.add(_basketItem);
    this.hideSpinner(SpinnerTypes.BallAtom);
    this.toastrService.message("Ürün sepete eklendi", "Eklendi", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    })
  }

}
