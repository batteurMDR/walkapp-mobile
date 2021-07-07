import { Injectable } from '@angular/core';
import { IPedometerData } from '@ionic-native/pedometer';
import axios from 'axios';
import { API_URL } from '../constants';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class WalkService {

  constructor(private _userService: UserService) { }

  setNew(data: IPedometerData) {
    const promises = [axios.post(API_URL + '/users/' + this._userService.currentUser.value + '/walks', {
      distance: data.distance,
      localization: 'Paris',
      points: data.numberOfSteps,
    }), axios.patch(API_URL + '/users/' + this._userService.currentUser.value, {
      pointsRemaining: this._userService.getCurrentUser().pointsRemaining + data.numberOfSteps
    })]

    Promise.all(promises).then(() => {
      this._userService.refreshData();
    }).catch((e) => {
      console.error(e);
    })
  }
}
