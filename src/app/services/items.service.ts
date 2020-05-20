import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  endpoint = 'https://crudcrud.com/api/e1286d5de7c9416ab82562c4d9714713/items';
  items: Item[] = [];
  currentItem: Item;

  constructor(private httpClient:HttpClient) { }

  saveItem(item: Item) {
    //console.log('>>>>>> ITEMs ', this.items);
    //this.items.push(item);
    //console.log('>>>>>> ITEMs ', this.items);

    let itemForService ={
      title : item.title,
      quantity : item.quantity.toString()
    };

    return this.httpClient.post(this.endpoint, itemForService);

  }

  getItems() {
    return this.httpClient.get<[Item]>(this.endpoint);
  }

  getSingleItem(id: string) {
    return this.httpClient.get<Item>(this.endpoint + '/' + id);
  }

  updateItem(item: Item) {
    let itemForService ={
      title : item.title,
      quantity : item.quantity.toString()
    };
    return this.httpClient.put(this.endpoint + '/' + item._id, itemForService);
  }

  deleteItem() {
    return this.httpClient.delete(this.endpoint + '/' + this.currentItem._id);
  }
}
