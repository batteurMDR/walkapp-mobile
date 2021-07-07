import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from '../constants';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SkinService {

  public availableSkins = new BehaviorSubject([]);

  constructor(private _userService: UserService) {
    axios.get(API_URL + '/skins').then((response) => {
      this.availableSkins.next(response.data);
      console.log(this.availableSkins.value)
    });
  }

  public getOtherSkins() {
    return combineLatest([this._userService.getCurrentUserAsObservable(), this.availableSkins]).pipe(
      map(([user, availableSkins]) => availableSkins.filter((as) => !user.skins.map((us) => us._id).includes(as._id)))
    )
  }

  public getMySkins() {
    return this._userService.getCurrentUserAsObservable().pipe(
      map((user) => user.skins)
    )
  }

  public getCurrentSkin() {
    return this._userService.getCurrentUserAsObservable().pipe(
      map((user) => user.skins.find((us) => us._id === user.skinSelected))
    )
  }
}
