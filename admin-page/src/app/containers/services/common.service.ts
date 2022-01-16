import { API_URL } from "./../constants/config";
import { ApiService } from "./api/api.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  constructor(public apiService: ApiService) {}

  caculatorStatistical = (dateTime) => {
    let url = `${API_URL}users/caculator-statistical?dateFrom=${dateTime.dateFrom}&dateTo=${dateTime.dateTo}`;
    return this.apiService.postWithToken(url, dateTime);
  };

  upload = (file: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file, file.name);
      let url = `${API_URL}common/upload`;
      this.apiService.post(url, formData).subscribe(
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
