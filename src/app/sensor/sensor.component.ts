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
    sensors: ISensor[];
    public sensorsTest: ISensor[] = [
        {
            "sensor_id": 1,
            "name": "Test Sensor 1",
            "location": "Test Location 1",
            "isActive": true,
            "type": "test"
        },
        {
            "sensor_id": 2,
            "name": "Test Sensor 2",
            "location": "Test Location 2",
            "isActive": false,
            "type": "test"
        }
    ];

    constructor(
        public storeService: StoreService,
        private backendService: BackendService,
        private http: HttpClient
    ) {}

    ngOnInit(): void {
        this.backendService.getSensors().subscribe(() => {
            this.sensors;
          });
    }
}

