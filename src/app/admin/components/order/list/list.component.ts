import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { List_Order } from 'src/app/contracts/order/list_order';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { OrderService } from 'src/app/services/common/models/order.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(private orderService: OrderService, spinner: NgxSpinnerService, private alertifyService: AlertifyService) {
    super(spinner);
  }


  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['orderCode', 'username', 'totalPrice', 'createdDate', 'delete'];
  dataSource: MatTableDataSource<List_Order> = null;

  async getOrders() {
    this.showSpinner(SpinnerTypes.BallAtom);
    const allOrders: { totalOrderCount: number; orders: List_Order[] } = await this.orderService.getAllOrders(this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerTypes.BallAtom),
      errorMessage => this.alertifyService.message(errorMessage, {
        messageType: MessageType.Error,
        position: Position.TopRight
      }))
    this.dataSource = new MatTableDataSource<List_Order>(allOrders.orders)
    this.paginator.length = allOrders.totalOrderCount;

  }


  async pageChanged() {
    await this.getOrders()
  }


  async ngOnInit() {
    await this.getOrders();
  }

}
