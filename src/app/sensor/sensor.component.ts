import { Component, OnInit } from '@angular/core';
import { StoreService } from '../shared/store.service';
import { BackendService } from '../shared/backend.service';
import { ISensor } from '../shared/interfaces/Sensor';
import { HttpClient } from '@angular/common/http';
import { RouterExtensions } from '@nativescript/angular';
import { IMeasurement } from '../shared/interfaces/Measurement';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})
export class SensorComponent implements OnInit {
  lastMeasurements: { [sensorId: number]: IMeasurement } = {};

  constructor(
    public storeService: StoreService,
    private backendService: BackendService,
    private http: HttpClient,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.backendService.getSensors().subscribe(
      (data) => {
        console.log('Sensors loaded:', data);
        this.storeService.sensors = data;

        if (this.storeService.sensors && this.storeService.sensors.length > 0) {
          console.log('Sensors array is not empty.');
          this.loadLastMeasurements();
        } else {
          console.log('Sensors array is empty.');
        }
      },
      (error) => {
        console.error('Error fetching sensors:', error);
      }
    );
  }

  loadLastMeasurements() {
    this.storeService.sensors.forEach((sensor) => {
      const apiUrl = `http://192.168.17.173:8090/sensor/${sensor.sensor_id}/measurements`;
      this.http.get<IMeasurement[]>(apiUrl).subscribe(
        (data: IMeasurement[]) => {
          const sortedMeasurements = data.sort((a, b) => {
            const timestampA = new Date(a.timestamp).getTime();
            const timestampB = new Date(b.timestamp).getTime();
            return timestampB - timestampA;
          });

          this.lastMeasurements[sensor.sensor_id] = sortedMeasurements[0];
        },
        (error) => {
          console.error('Error fetching measurements:', error);
        }
      );
    });
  }

  onSensorTap(sensorId: number) {
    this.routerExtensions.navigate(['/sensor', sensorId, 'measurements']);
  }

  onChartTap(sensorId: number) {
    this.routerExtensions.navigate(['/chart', sensorId, 'measurements']);
  }
}
