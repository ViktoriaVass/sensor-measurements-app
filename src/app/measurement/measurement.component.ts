import { Component, OnInit } from '@angular/core';
import { StoreService } from '../shared/store.service';
import { IMeasurement } from '../shared/interfaces/Measurement';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../shared/backend.service';
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
    private backendService: BackendService,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.params.id;
    const apiUrl = this.backendService.ipAddress + `/sensor/${id}/measurements`;
    const sensor = this.storeService.sensors.find((s) => s.sensor_id === id);

    this.sensorName = sensor ? sensor.name : '';

    this.http.get<IMeasurement[]>(apiUrl).subscribe(
      (data: IMeasurement[]) => {

        this.measurements = data.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        this.measurements = this.measurements.reverse().slice(0, 10);
      },
      (error) => {
        console.error('Error fetching measurements:', error);
      }
    );
  }

}
