import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SkinService } from '../services/skin.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-avatar',
  templateUrl: 'avatar.page.html',
  styleUrls: ['avatar.page.scss']
})
export class AvatarPage {

  public currentSkin = null;

  constructor(public alertController: AlertController, public skinService: SkinService, public userService: UserService) {
    this.skinService.getCurrentSkin().subscribe((current) => {
      this.currentSkin = current;
    })
  }

  public async buyThisSkin(skin) {
    if (skin.cost > this.userService.getCurrentUser().pointsRemaining) {
      const alert = await this.alertController.create({
        header: 'Ooooops!',
        message: `Cet avatar est trop chère, marcher plus pour pouvoir l'acheter.`,
        buttons: ['OK']
      });
  
      await alert.present();
      return;
    }
    this.userService.buyNewSkin(skin._id, skin.cost);
  }

  public setNewCurrentSkin(skin) {
    this.userService.setNewCurrentSkin(skin._id);
  }

}
