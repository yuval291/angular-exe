import { Injectable } from '@angular/core';
import {Image} from "../models/image";

@Injectable({
  providedIn: 'root'
})
export class ImgService {

  private readonly image!: Image[];

  constructor() {
    this.image = [
      {url: "https://cdn-icons.flaticon.com/png/512/2163/premium/2163350.png?token=exp=1659947021~hmac=2152f337acb6a2faebdf927042e54269" , name:"home"},
      {url: "https://cdn-icons-png.flaticon.com/512/3749/3749784.png" , name:"work"},
      {url: "https://cdn-icons-png.flaticon.com/512/4290/4290854.png" , name:"shopping"},
      {url: "https://cdn-icons.flaticon.com/png/512/2273/premium/2273225.png?token=exp=1659949139~hmac=0f25ad0fdf19e0fd1d2f08ffd4de87eb" , name:"event"},
      {url: "https://cdn-icons.flaticon.com/png/512/3220/premium/3220733.png?token=exp=1659949348~hmac=3adb564606859f07ab71ed31941f91fd" , name:"fun"},
      {url: "https://cdn-icons-png.flaticon.com/512/552/552489.png" , name:"Contact"},
    ]
  }

  getImage(): Image[] {
    return this.image;
  }

  getImageByName(name:string){
    return this.image.find(img => img.name===name)!.url;
  }
}
