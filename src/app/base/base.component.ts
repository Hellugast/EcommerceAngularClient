import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


export class BaseComponent {
  /**
   *
   */
  constructor(private spinner: NgxSpinnerService) { }

  showSpinner(spinnerNameType: SpinnerTypes) {
    this.spinner.show(spinnerNameType);
    setTimeout(() => this.hideSpinner(spinnerNameType), 300);
  }

  hideSpinner(spinnerNameType: SpinnerTypes) {
    this.spinner.hide(spinnerNameType);
  }
}



export enum SpinnerTypes {
  BallScale = "s1",
  BallAtom = "s2"

}