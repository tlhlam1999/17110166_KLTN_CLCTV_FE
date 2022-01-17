import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SUCCESS_STATUS } from 'src/app/containers/constants/config';
import { UserService } from 'src/app/containers/services/user.service';
import { LocalStorageService } from 'src/app/containers/services/localStorage/local-storage.service';
import { CommonService } from 'src/app/containers/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  user: any = {
    username: '',
    email: '',
    password: '',
  };
  userLogin = {
    username: '',
    password: '',
  };
  messageError: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {}

  register = () => {
    this.userService.register(this.user).then((res: any) => {
      if (res['status'] == SUCCESS_STATUS) {
        this.localStorageService.set('customer', {
          id: res.data.id,
          username: res.data.userName,
          token: res.data.token,
        });
        this.router.navigate(['/home']);
      }
    });
  };

  login = () => {
    if (this.userLogin.username && this.userLogin.username) {
      this.userService.login(this.userLogin).then((res: any) => {
        if (res['status'] == SUCCESS_STATUS) {
          this.localStorageService.set('customer', {
            id: res.data.id,
            username: res.data.userName,
            token: res.data.token,
          });
          this.router.navigate(['/home']);
          this.commonService.changeData({ username: res.data.userName });
        } else {
          this.messageError = 'Kiểm tra lại tài khoản và mật khẩu';
        }
      });
    } else {
      this.messageError = 'Nhập tài khoản và mật khẩu';
    }
  };
}
