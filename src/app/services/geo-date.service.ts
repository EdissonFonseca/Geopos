import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse  } from '@capacitor/core';
import { Device, DeviceId } from '@capacitor/device';
import { Geolocation } from '@capacitor/geolocation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeoDateService {
  private locateUrl = `${environment.apiUrl}/locations/locate`;

  constructor() { }

  async getLocation(): Promise<{ latitude: string, longitude: string } | null> {
    try {
      const position = await Geolocation.getCurrentPosition();
      const latitude: string = position.coords.latitude.toString();
      const longitude: string = position.coords.longitude.toString();
      return { latitude, longitude };
    } catch (error) {
      console.error('Error getting current location', error);
      return null;
    }
  }

  getCurrentDateTime(): string {
    const currentDateTime = new Date();
    return currentDateTime.toISOString();
  }

  async locate(phone:string, latitude: string, longitude:string, date: string): Promise<any>{
    const data = {Phone: phone, Latitude: latitude, Longitude: longitude, Date:date};
    const options = {url: this.locateUrl, data: data, headers: { 'Content-Type': 'application/json' }};

    try{
      const response: HttpResponse = await CapacitorHttp.post(options);
      if (response.status == 200) {
        return response.data;
      } else {
        throw new Error(`Response Status ${response.status}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Request error: ${error.message}`);
      } else {
        throw new Error(`Unknown error: ${error}`);
      }
    }
  }
  async getDeviceId(): Promise<DeviceId> {
    const info = await Device.getInfo();
    const id = await Device.getId();
    return id;
  }
}
