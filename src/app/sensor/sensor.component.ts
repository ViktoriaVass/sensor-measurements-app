import { Component, OnInit } from '@angular/core';
import { StoreService } from '../shared/store.service';
import { BackendService } from '../shared/backend.service';
import { ISensor } from '../shared/interfaces/Sensor';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
})
export class SensorComponent implements OnInit {

    constructor(
        public storeService: StoreService,
        private backendService: BackendService,
        private http: HttpClient
    ) {}

    ngOnInit(): void {
      this.backendService.getSensors().subscribe(
        (data) => {
          console.log('Sensors loaded:', data);
          this.storeService.sensors = data;

          if (this.storeService.sensors && this.storeService.sensors.length > 0) {
            console.log('Sensors array is not empty.');
          } else {
            console.log('Sensors array is empty.');
          }

        },
        (error) => {
          console.error('Error fetching sensors:', error);
        }
      );
    }
    
      
}
