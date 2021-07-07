import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-wall',
  templateUrl: 'wall.page.html',
  styleUrls: ['wall.page.scss']
})
export class WallPage {

  constructor(public userService: UserService) {
    this.userService.getWallUsers().subscribe((result) => console.log(result))
  }

  doRefresh(event) {
    this.userService.refreshData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
