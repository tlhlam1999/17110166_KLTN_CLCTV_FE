import { CategoryService } from "./../../containers/services/category.service";
import { ModalDirective } from "ngx-bootstrap/modal";
import { Router } from "@angular/router";
import { SUCCESS_STATUS } from "./../../containers/constants/config";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
})
export class CategoryComponent implements OnInit {
  @ViewChild("modalCreate") modalCreate: ModalDirective;
  categories: any = [];
  messageError: string = "";
  type: string;
  category: Object = {
    name: "",
    description: "",
    isDisabled: false,
  };
  nameSearch: string = "";
  
  constructor(
    public categoryService: CategoryService,
    public router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.categoryService.get().subscribe(
      (res) => {
        if (SUCCESS_STATUS == res["status"]) {
          this.categories = res["data"].filter((x) => x.id != 9999);
        }
      },
      (err) => {
        window.alert("Connection Error !");
      }
    );
  }
  changeField = () => {
    if (this.category["name"]) {
      this.messageError = "";
    }
  };
  save = () => {
    if (this.category["name"]) {
      this.categoryService
        .save(this.category, this.type)
        .then((res) => {
          if (res["status"] == SUCCESS_STATUS) {
            this.toastr.success("Success", "");
            if (this.type === "create") {
              this.categories.push(res["data"]);
            } else {
              for (let index = 0; index < this.categories.length; index++) {
                if (this.categories[index].id == res["data"].id) {
                  this.categories[index] = res["data"];
                }
              }
            }
          }
        })
        .catch((e) => {
          window.alert("Connection Error !");
        });
      this.modalCreate.hide();
    } else {
      this.messageError = "Vui lòng nhập tên danh mục";
    }
  };

  remove = (category) => {
    this.categoryService
      .save({ ...category, isDisabled: true }, "edit")
      .then((res) => {
        if (res["status"] == SUCCESS_STATUS) {
          this.toastr.success("Success", "");
          for (let index = 0; index < this.categories.length; index++) {
            if (this.categories[index].id == category.id) {
              this.categories.splice(index, 1);
            }
          }
        }
      })
      .catch((e) => {
        window.alert("Connection Error !");
      });
  };

  searchCategoryByName = () => {
    this.categoryService
      .searchByName(this.nameSearch)
      .then((res) => {
        if (res["status"] == SUCCESS_STATUS) {
          this.categories = res["data"];
        }
      })
      .catch((e) => {
        window.alert("Connection Error !");
      });
  };

  openModal = (category, type) => {
    this.messageError = "";
    this.type = type;
    this.category =
      type === "edit"
        ? { ...category }
        : {
            name: "",
            isDisabled: false,
            description: "",
          };
    this.modalCreate.show();
  };
}
