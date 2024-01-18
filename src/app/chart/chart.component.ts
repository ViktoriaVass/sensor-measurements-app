import { Component, OnInit } from '@angular/core';
import { StoreService } from '../shared/store.service';
import { IMeasurement } from '../shared/interfaces/Measurement';
import { BackendService } from '../shared/backend.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EventData, SegmentedBar } from '@nativescript/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {

  public chartData: { Category: Date; Value: number }[] = [];
  sensorMeasurements: IMeasurement[] = [];
  sensorName: string;
  selectedIndex: number = 0;

  constructor(
    public storeService: StoreService,
    private backendService: BackendService,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  getAllSensorMeasurements(id: number): Observable<IMeasurement[]> {
    const apiUrl = this.backendService.ipAddress + `/sensor/${id}/measurements`;
    const sensor = this.storeService.sensors.find((s) => s.sensor_id === id);

    this.sensorName = sensor ? sensor.name : '';

    return this.http.get<IMeasurement[]>(apiUrl);
  }

  getMeasurements(): Observable<IMeasurement[]> {
    const id = +this.route.snapshot.params.id;

    return this.getAllSensorMeasurements(id);
  }

  getDateFormat(): string {
    if (this.selectedIndex === 0) {
      return 'HH:mm';
    } else {
      return 'dd/MM';
    }
  }

  getMajorStepUnit(): string {
    if (this.selectedIndex === 0) {
      return 'Hour';
    } else {
      return 'Day';
    }
  }

  getMajorStep(): string {
    if (this.selectedIndex === 2) {
      return '7';
    } else {
      return '1';
    }
  }

  onSegmentedBarIndexChanged(args: EventData): void {
    const segmentedBar = args.object as SegmentedBar;
    console.log('SegmentedBar index changed to:', segmentedBar.selectedIndex);
    this.selectedIndex = segmentedBar.selectedIndex;
    const now = new Date();

    this.getMeasurements().subscribe(
      (data: IMeasurement[]) => {
        this.sensorMeasurements = data;
        console.log(`all Charts: ${JSON.stringify(this.sensorMeasurements)}`);
        this.sensorMeasurements = this.sensorMeasurements.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

        switch (segmentedBar.selectedIndex) {
          case 0:
            console.log('Selected 1 day');
            const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

            if (this.sensorMeasurements) {
              const measurementsLastDay = this.sensorMeasurements.filter(
                measurement => new Date(measurement.timestamp) >= twentyFourHoursAgo
              );

              this.chartData = measurementsLastDay.map(measurement => ({
                Category: new Date(measurement.timestamp),
                Value: measurement.temperature,
              }));

              console.log('Measurements last 24 hours loaded:', this.chartData);
            } else {
              console.error('Measurements array is undefined.');
            }

            break;

          case 1:
            console.log('Selected 7 day');
            const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

            if (this.sensorMeasurements) {
              const measurementsLastSevenDay = this.sensorMeasurements.filter(
                measurement => new Date(measurement.timestamp) >= sevenDaysAgo
              );

              this.chartData = measurementsLastSevenDay.map(measurement => ({
                Category: new Date(measurement.timestamp),
                Value: measurement.temperature,
              }));

              console.log('Measurements last 7 days loaded:', this.chartData);
            } else {
              console.error('Measurements array is undefined.');
            }

            break;

          case 2:
            console.log('Selected 30 day');
            const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

            if (this.sensorMeasurements) {
              const measurementsLastThirtyDay = this.sensorMeasurements.filter(
                measurement => new Date(measurement.timestamp) >= thirtyDaysAgo
              );

              this.chartData = measurementsLastThirtyDay.map(measurement => ({
                Category: new Date(measurement.timestamp),
                Value: measurement.temperature,
              }));

              console.log('Measurements last 30 days loaded:', this.chartData);
            } else {
              console.error('Measurements array is undefined.');
            }

            break;

          default:
            break;
        }
      },
      (error) => {
        console.error('Error fetching measurements:', error);
      }
    );
  }
}
