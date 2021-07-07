import { Component } from '@angular/core';
import { IPedometerData, Pedometer } from '@ionic-native/pedometer/ngx';
import { AlertController } from '@ionic/angular';
import { WalkService } from '../services/walk.service';

@Component({
  selector: 'app-walk',
  templateUrl: 'walk.page.html',
  styleUrls: ['walk.page.scss']
})
export class WalkPage {

  public pedometerIsStarted = false;
  public pedometer = new Pedometer();
  public lastPedometerDate: IPedometerData = null;

  constructor(public alertController: AlertController, public walkService: WalkService) {}

  public togglePedometer(event) {
    if (this.pedometerIsStarted) {
      this.pedometer.stopPedometerUpdates();
      this.pedometerIsStarted = false;
      if (this.lastPedometerDate) {
        this.walkService.setNew(this.lastPedometerDate);
        this._informUserAboutPoints(this.lastPedometerDate.numberOfSteps);
        this.lastPedometerDate = null;
      }
    } else {
      this.pedometer.startPedometerUpdates().subscribe((lastPedometerDate) => {
        this.lastPedometerDate = lastPedometerDate;
      });
      this.pedometerIsStarted = true;
    }
  }

  private async _informUserAboutPoints(points: number) {
    const alert = await this.alertController.create({
      header: 'Félicitations',
      message: `Vous venez de récolter ${points} points.`,
      buttons: ['OK']
    });

    await alert.present();
  }

}
