import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SUCCESS_STATUS } from 'src/app/containers/constants/config';
import { CommonService } from 'src/app/containers/services/common.service';
import { HomeService } from 'src/app/containers/services/home.service';
declare var $: any;
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  idDetail: number = 0;
  product: any = {};
  clientIp: any = '';
  messageConfirm: string = "";
  constructor(
    private homeService: HomeService,
    private actRoute: ActivatedRoute,
    private commonService: CommonService,
  ) { 
    this.idDetail = parseInt(this.actRoute.snapshot.params['idDetail']);
    this.commonService.getClientIp().then((res: any) => {
      this.clientIp = res['ip'];
    });
  }

  ngOnInit(): void { 
    this.homeService.getProductById(this.idDetail).subscribe((res: any) => {
      if (res['status'] == SUCCESS_STATUS) { 
        this.product = res['data'];
      }
    });
  }

  addToCart = (product: any) => {
    let order = {
      productId: product.id,
      orderId: null,
      quantity: 1,
      balance: product.price,
      clientIp: this.clientIp,
      userId: null,
    };
    this.homeService.createOrderDetail(order).then((res: any) => {
      if (res['status'] == SUCCESS_STATUS) {
        $('#modalConfirm').modal('show');
        this.messageConfirm = 'Thêm vào giỏ hàng thành công!';
      }
    });
  };
}
