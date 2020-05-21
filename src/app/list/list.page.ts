import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item.model';
import { ItemsService } from '../services/items.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  items: Item[] = [];

  constructor(private itemsService: ItemsService, private router: Router, private itemService: ItemsService) { 

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    //this.items = this.itemsService.items
    this.itemsService.getItems().subscribe( res => {
      console.log('>>>> RES CONSULTA ', res);
      this.items = res;
    }, err => {
      alert(err);
    });
  }
  

  new() {
    this.itemsService.currentItem = null;
    this.router.navigate(['additem']);
  }

  edit(item: Item) {
    this.itemsService.currentItem = item;
    this.router.navigateByUrl('additem?id=' + item._id);
  }
}
