import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemsService } from '../services/items.service';
import { Item } from '../models/item.model';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.page.html',
  styleUrls: ['./additem.page.scss'],
})
export class AdditemPage implements OnInit {

  formAddItem: FormGroup;
  id:string;
  image:string;
  constructor(private fb:FormBuilder, 
              private httpClient:HttpClient, 
              private router: Router, 
              private itemService:ItemsService, 
              private route: ActivatedRoute, 
              private camera: Camera) {
    this.formAddItem = this.fb.group({
      title:['',Validators.required],
      quantity:['',[Validators.required, Validators.pattern('^[1-9][0-9]*$')]]
    });

    console.log('ITEM DE SERVICE ', this.itemService.currentItem);

    this.route.queryParams.subscribe(params => {
      console.log('QUERY PARAMS', params);
      if (params.id) {
        this.id = params.id;
        this.itemService.getSingleItem(params.id).subscribe(item =>{
          this.formAddItem.get('title').setValue(item.title);
          this.formAddItem.get('quantity').setValue(item.quantity);
          this.image = item.image;
        });
      }
    });
   }

   addItem() {
     let item = new Item();
     item.title = this.formAddItem.get('title').value;
     item.quantity = this.formAddItem.get('quantity').value;

     if (this.image) {
       item.image = this.image;
     }

     this.itemService.setIsLoading(true);
     if (this.id) {
        item._id = this.id;
        this.itemService.updateItem(item).subscribe( res => {
            console.log('>>>> RESULTADO UPDATE ', res);
            this.itemService.setIsLoading(false);
            this.router.navigate(['list']);
        }, err => {
          console.log(err);
          this.itemService.setIsLoading(false);
          alert('Ocurrion un error al actualizar el item');
        });
     } else {
      this.itemService.saveItem(item).subscribe(res => {
        console.log('>>>> RESULTADO SAVE ', res);
        this.router.navigate(['list']);
        this.itemService.setIsLoading(false);
      }, err => {
         console.log(err);
         this.itemService.setIsLoading(false);
         alert('Ocurrio un error al guardar el item');
      });
 
     }
   }


  
  delete(){
    this.itemService.setIsLoading(true);
    if (this.id) {
      this.itemService.deleteItem().subscribe(res => {
        console.log('>>>> RESULTADO DELETE ', res);
        this.itemService.setIsLoading(false);
        this.router.navigate(['list']);
      }, err => {
        console.log(err);
        this.itemService.setIsLoading(false);
        alert('Ocurrio un error al borrar el item');
      });
    }
   }

   addPhoto() {
    this.itemService.setIsLoading(true);
    const options: CameraOptions = {
      quality: 1,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.image = 'data:image/jpeg;base64,' + imageData;
     this.itemService.setIsLoading(false);
    }, (err) => {
      console.log(err);
      this.itemService.setIsLoading(false);
      alert('Ocurrio un error al tomar la foto');
    });
   }
   
  ngOnInit() {
  }

}
