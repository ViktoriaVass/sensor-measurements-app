// measurement.component.ts

import { Component, OnInit } from '@angular/core';
import { StoreService } from '../shared/store.service';
import { IMeasurement } from '../shared/interfaces/Measurement';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../shared/backend.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.scss']
})
export class MeasurementComponent implements OnInit {
  measurements: IMeasurement[]; 
  sensorName: string;

  constructor(
    public storeService: StoreService,
    private activatedRoute: ActivatedRoute,
    private backendService: BackendService,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.params.id;
    const apiUrl = `http://192.168.1.4:8090/sensor/${id}/measurements`;
    const sensor = this.storeService.sensors.find((s) => s.sensor_id === id);

    this.sensorName = sensor ? sensor.name : '';

    this.http.get<IMeasurement[]>(apiUrl).subscribe(
      (data: IMeasurement[]) => {
        // Reverse the array to get the most recent measurements first
        this.measurements = data.reverse().slice(0, 10);
      },
      (error) => {
        console.error('Error fetching measurements:', error);
      }
    );
  }
  
}
