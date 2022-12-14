import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update_basket_item';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { BasketItemDeleteState, BasketItemRemoveDialogComponent } from 'src/app/dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { CompleteShoppingDialogComponent, CompleteShoppingState } from 'src/app/dialogs/complete-shopping-dialog/complete-shopping-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

declare var $: any

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private basketService: BasketService,
    private orderService: OrderService, private toastrService: CustomToastrService, private router: Router,
    private dialogService: DialogService) {
    super(spinner)
  }

  basketItems: List_Basket_Item[];

  async ngOnInit(): Promise<void> {
    this.showSpinner(SpinnerTypes.BallAtom)
    this.basketItems = await this.basketService.get()
    this.hideSpinner(SpinnerTypes.BallAtom)
  }

  async changeQuantity(object: any) {
    this.showSpinner(SpinnerTypes.BallAtom)
    const basketItemId: string = object.target.attributes["id"].value;
    const quantity: number = object.target.value;
    const basketItem: Update_Basket_Item = new Update_Basket_Item();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;
    await this.basketService.updateQuantity(basketItem)
    this.hideSpinner(SpinnerTypes.BallAtom)
  }

  removeBasketItem(basketItemId: string) {
    $("#basketModal").modal("hide");

    this.dialogService.openDialog({
      componentType: BasketItemRemoveDialogComponent,
      data: BasketItemDeleteState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerTypes.BallAtom);

        await this.basketService.remove(basketItemId)
        $("." + basketItemId).fadeOut(300, () => this.hideSpinner(SpinnerTypes.BallAtom));
        $("#basketModal").modal("show");
      }
    })
  }

  completeShopping() {

    this.dialogService.openDialog({
      componentType: CompleteShoppingDialogComponent,
      data: CompleteShoppingState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerTypes.BallAtom)
        const order: Create_Order = new Create_Order();
        order.adress = "Erenler";
        order.description = "Eskiler kumarta?? diye bilir..."
        await this.orderService.create(order)
        this.hideSpinner(SpinnerTypes.BallAtom);
        this.toastrService.message("Sipari?? al??nm????t??r", "Sipari?? olu??turuldu", {
          messageType: ToastrMessageType.Info,
          position: ToastrPosition.BottomRight
        })
        this.router.navigate(["/"])
      }
    })


  }

}
