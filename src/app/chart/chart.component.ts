import { Component, OnInit } from '@angular/core';
import { StoreService } from '../shared/store.service';
import { IMeasurement } from '../shared/interfaces/Measurement';
import { BackendService } from '../shared/backend.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  public chartData: { Category: Date; Value: number }[] = [];

  constructor(
    public storeService: StoreService,
    public backendService: BackendService
  ) {}

  ngOnInit(): void {
    this.backendService.getMeasurements().subscribe(
      (data) => {
        this.storeService.measurements = data;
        
        this.storeService.measurements.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

        this.chartData = this.storeService.measurements.map(measurement => ({
          Category: new Date(measurement.timestamp),
          Value: measurement.temperature,
        }));

        console.log(`Charts: ${JSON.stringify(this.chartData)}`);
      },
      (error) => {
        console.error('Error fetching sensors:', error);
      }
    );
  }
}


  /*
  public dataItems = [
    { Category: 'A', Value: 10 },
    { Category: 'B', Value: 25 },
    { Category: 'C', Value: 15 },
  ];*/

