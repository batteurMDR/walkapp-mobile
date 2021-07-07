import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser = new BehaviorSubject<string>(null);
  public availableUsers = new BehaviorSubject([]);

  constructor() {
    this.refreshData();
  }

  refreshData() {
    axios.get(API_URL + '/users?filter=' + JSON.stringify({include: [{relation: 'walks'},{relation: 'skins'}]})).then((response) => {
      this.availableUsers.next(this._formatUsers(response.data));
      console.log(this.availableUsers.value)
    });
  }

  setCurrentUser(id: string) {
    this.currentUser.next(id);
  }

  getCurrentUser() {
    return this.availableUsers.value.find((au) => au._id === this.currentUser.value);
  } 

  getCurrentUserAsObservable() {
    return this.availableUsers.pipe(
      map((users) => users.find((au) => au._id === this.currentUser.value))
    );
  } 

  getWallUsers() {
    return this.availableUsers.pipe(
      map((users) => {
        const usersWithTotal = [];
        users.forEach((user) => {
          let total = user.walks.reduce((acc, walk) => acc + walk.points, 0);
          usersWithTotal.push({...user, total});
        })
        return usersWithTotal;
      }),
      map((users) => users.sort((a, b) => b.total - a.total))
    )
  }

  setNewCurrentSkin(skinSelected: string) {
    axios.patch(API_URL + '/users/' + this.currentUser.value, {
      skinSelected
    }).then(() => {
      this.refreshData();
    }).catch((e) => {
      console.error(e);
    });
  }
  
  buyNewSkin(skinId: string, cost: number) {
    const promises = [axios.post(API_URL + '/user-has-skins', {
      userId: this.currentUser.value,
      skinId
    }), axios.patch(API_URL + '/users/' + this.currentUser.value, {
      pointsRemaining: this.getCurrentUser().pointsRemaining - cost
    })]
    
    Promise.all(promises).then(() => {
      this.refreshData();
    }).catch((e) => {
      console.error(e);
    });
  }

  private _formatUsers(users: any[]) {
    return users.map((user) => ({
      ...user,
      walks: user.walks ? user.walks : []
    }))
  }
}
