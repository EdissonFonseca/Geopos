import { Component } from '@angular/core';
import { GeoDateService } from '../../services/geo-date.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  latitude: string = '';
  longitude: string = '';

  constructor(private geoDateService: GeoDateService, private alertController: AlertController) {}

  async captureLocation() {
      const phone: string = '';

      const location = await this.geoDateService.getLocation();
      if (location) {
        this.latitude = location.latitude;
        this.longitude = location.longitude;
        this.geoDateService.locate(phone, this.latitude, this.longitude, this.geoDateService.getCurrentDateTime());
      } else {
        console.log('Failed to get location');
      }

    }

  async presentLocationConfirmation() {
    const alert = await this.alertController.create({
      header: 'Ubicación Registrada',
      message: 'Su ubicación ha sido registrada',
      buttons: ['OK']
    });

    await alert.present();
  }

  logout(){
    window.close();
  }
}
