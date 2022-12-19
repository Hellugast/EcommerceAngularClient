import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { QrCodeService } from 'src/app/services/common/qr-code.service';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-qrcode-dialog',
  templateUrl: './qrcode-dialog.component.html',
  styleUrls: ['./qrcode-dialog.component.scss']
})
export class QrcodeDialogComponent extends BaseDialog<QrcodeDialogComponent> implements OnInit {

  constructor(
    dialogRef: MatDialogRef<QrcodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string, private qRCodeService: QrCodeService, private domSanitizer: DomSanitizer) {
    super(dialogRef)
  }

  qRCodeSafeURL: SafeUrl;

  async ngOnInit(): Promise<void> {
    const qRCodeBlob: Blob = await this.qRCodeService.generateQRCode(this.data);
    const url: string = URL.createObjectURL(qRCodeBlob);
    this.qRCodeSafeURL = this.domSanitizer.bypassSecurityTrustUrl(url);
  }

}
