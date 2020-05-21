import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  isLoading :Subject<boolean> = new Subject<boolean>();
  endpoint = 'https://supermarket-rest.herokuapp.com/test/ricardo';
  items: Item[] = [];
  currentItem: Item;

  constructor(private httpClient:HttpClient) { }

  setIsLoading(loading: boolean) {
    this.isLoading.next(loading);
  }

  getIsLoading() {
    return this.isLoading.asObservable();
  }

  saveItem(item: Item) {
    //console.log('>>>>>> ITEMs ', this.items);
    //this.items.push(item);
    //console.log('>>>>>> ITEMs ', this.items);

    let itemForService ={
      title : item.title,
      quantity : item.quantity.toString(),
      image : item.image
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
      quantity : item.quantity.toString(),
      image : item.image
    };
    return this.httpClient.put(this.endpoint + '/' + item._id, itemForService);
  }

  deleteItem() {
    return this.httpClient.delete(this.endpoint + '/' + this.currentItem._id);
  }
}
