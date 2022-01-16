import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { API_URL } from '../constants/config';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(public apiService: ApiService) {}

  get = () => {
    let url = `${API_URL}orders/get-orders`;
    return this.apiService.getWithToken(url);
  };

  edit = (cart: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}orders/edit`;
      this.apiService.postWithToken(url, cart).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  create = (cart: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}orders/create`;
      this.apiService.postWithToken(url, cart).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };
  
  remove = (id: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}orders/delete?id=${id}`;
      this.apiService.getWithToken(url).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };
}
