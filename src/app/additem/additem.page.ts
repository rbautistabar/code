import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemsService } from '../services/items.service';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.page.html',
  styleUrls: ['./additem.page.scss'],
})
export class AdditemPage implements OnInit {

  formAddItem: FormGroup;
  id:string;
  constructor(private fb:FormBuilder, private httpClient:HttpClient, private router: Router, private itemService:ItemsService, private route: ActivatedRoute) {
    this.formAddItem = this.fb.group({
      title:['',Validators.required],
      quantity:['',[Validators.required, Validators.pattern('^[1-9][0-9]*$')]]
    });

    console.log('ITEM DE SERVICE ', this.itemService.currentItem);

    this.route.queryParams.subscribe(params => {
      console.log('QUERY PARAMS', params);
      this.id = params.id;
      this.itemService.getSingleItem(params.id).subscribe(item =>{
        this.formAddItem.get('title').setValue(item.title);
        this.formAddItem.get('quantity').setValue(item.quantity);
      });
    });
   }

   addItem() {
     let item = new Item();
     item.title = this.formAddItem.get('title').value;
     item.quantity = this.formAddItem.get('quantity').value;

     if (this.id) {
        item._id = this.id;
        this.itemService.updateItem(item).subscribe( res => {
            console.log('>>>> RESULTADO UPDATE ', res);
            this.router.navigate(['list']);
        }, err => {
          console.log(err);
          alert('Ocurrion un error al actualizar el item');
        });
     } else {
      this.itemService.saveItem(item).subscribe(res => {
        console.log('>>>> RESULTADO SAVE ', res);
        this.router.navigate(['list']);
      }, err => {
         console.log(err);
         alert('Ocurrio un error al guardar el item');
      });
 
     }
   }


  
  delete(){
    this.itemService.deleteItem().subscribe(res => {
      console.log('>>>> RESULTADO DELETE ', res);
      this.router.navigate(['list']);
    }, err => {
       console.log(err);
       alert('Ocurrio un error al borrar el item');
    });

   }
   
  ngOnInit() {
  }

}
