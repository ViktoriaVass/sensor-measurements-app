import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StoreService } from './store.service';
import { ISensor } from './interfaces/Sensor';


@Injectable({
  providedIn: 'root',
})
export class BackendService {

  constructor(public storeService: StoreService, private http: HttpClient) {
  }

  public getSensors(): Observable<ISensor[]> {
    // !!! `http://YOUR-IP:8090/sensor` !!!
    return this.http.get<ISensor[]>("http://192.168.1.4:8090/sensor").pipe(
      map(data => {
        console.log('Raw response data:', data);

        const serializedData = JSON.stringify(data);
        const parsedData = JSON.parse(serializedData);

        console.log('Parsed data:', parsedData);

        this.storeService.sensors = parsedData.sort((a, b) => +a.sensor_id - +b.sensor_id);

        return this.storeService.sensors;
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
