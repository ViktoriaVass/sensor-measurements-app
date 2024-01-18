import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StoreService } from './store.service';
import { ISensor } from './interfaces/Sensor';
import { IMeasurement } from './interfaces/Measurement';


@Injectable({
  providedIn: 'root',
})
export class BackendService {

  constructor(public storeService: StoreService, private http: HttpClient) {
  }

  public getSensors(): Observable<ISensor[]> {
    // !!! `http://YOUR-IP:8090/sensor` !!!
    return this.http.get<ISensor[]>("http://192.168.17.173:8090/sensor").pipe(
      map(data => {

        const serializedData = JSON.stringify(data);
        const parsedData = JSON.parse(serializedData);

        this.storeService.sensors = parsedData.sort((a, b) => +a.sensor_id - +b.sensor_id);

        return this.storeService.sensors;
      }),
      catchError(this.handleError)
    );
  }


  public getMeasurements(): Observable<IMeasurement[]> {
    // !!! `http://YOUR-IP:8090/sensor/...` !!!
    return this.http.get<IMeasurement[]>("http://192.168.17.173:8090/measurement").pipe(
      map(data => {

        const serializedData = JSON.stringify(data);
        const parsedData = JSON.parse(serializedData);

        this.storeService.measurements = parsedData.sort((a, b) => +a.measurement_id - +b.measurement_id);

        return this.storeService.measurements;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    let errorMessage = 'Unknown error occurred';
  
    if (error instanceof HttpErrorResponse) {
      errorMessage = `Server-side Error: ${error.status}, Message: ${error.message}`;
  
      if (error.error) {
        console.error('Error Response:', error.error);
      }
    } else {
      errorMessage = `An error occurred: ${error.message}`;
      console.error(errorMessage);
    }
  
    return throwError(errorMessage);
  }  
  
}
