import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {map, Observable, switchAll} from "rxjs";
import {TodoList} from "../../models/todo-list";
import {ActivatedRoute, Router} from "@angular/router";
import {StateService} from "../../services/state.service";
import {ImgService} from "../../services/img.service";
import {Image} from "../../models/image";

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {

  list$!: Observable<TodoList>;
  listId: number = -1;
  imageUrl!: Image[];

  group = new FormGroup({
    caption: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required , Validators.minLength(30) , this.containsWords(10)]),
    imageUrl: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
  });

  colors = [
    {code: "#ff0000", name: "red"},
    {code: "#0000ff", name: "blue"},
    {code: "#22c45e", name: "green"},
    {code: "#4682B4", name: "steelblue"},
    {code: "#FF00FF", name: "magenta"},
    {code: "#5d1515", name: "brown"},
    {code: "#f49d0b", name: "orange"},
    {code: "#ea9cce", name: "pink"}
  ];

  constructor(private route: ActivatedRoute ,
              private stateService: StateService ,
              private router: Router,
              private  imgService: ImgService) {
    this.imageUrl = this.imgService.getImage();
  }

  ngOnInit(): void {
    // Pulls the number listed in the URL
    const index$ = this.route.params.pipe(
      map(prm => Number(prm['id'])));

    //Pulls the data of that list
    this.list$ = index$.pipe(
      map(index => this.stateService.getListById(index)),switchAll()
    );

    //Pulls the data of the list
    this.list$.subscribe(next => {
        if (next !== undefined) {
          this.listId = next.id;
          this.control("caption").setValue(next.caption);
          this.control("description").setValue(next.description);
          this.control("imageUrl").setValue(next.imageUrl);
          this.control("color").setValue(next.color);
        }
      }
    );
  }

  control(name: string): FormControl {
    const ctrl = this.group.get(name)! as FormControl;
    return ctrl;
  }

  private containsWords(number: number): (ctrl: AbstractControl) => null | ValidationErrors {
    return ctrl => {
      const val = ctrl.value;
      if (typeof(val) !== 'string') return null;

      const letters = val.split(' ');
      if (letters.length >= number) return null;

      return {
        'words': {
          required: number,
          actual: letters.length
        }
      }
    }
  }

  onSave() {
    const list :TodoList = {
      id: this.listId,
      caption: this.control("caption").value,
      description: this.control("description").value,
      imageUrl:this.imgService.getImageByName(this.control("imageUrl").value) ,
      color: this.control("color").value
    }
    if(this.listId !== -1){
      this.stateService.ModifyList(list).then();
    }else {
      this.stateService.AddList(list.caption,list.description,list.color,list.imageUrl).then();
    }
    this.router.navigate(['lists']).then();
  }
}
