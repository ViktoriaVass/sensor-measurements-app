import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {StoreService} from './store.service';
import {ISensor} from './interfaces/Sensor';
import {IMeasurement} from "./interfaces/Measurement";
import {AbstractControl, ValidationErrors} from "@angular/forms";

@Injectable({
    providedIn: 'root',
})
export class BackendService {

    constructor(public storeService: StoreService, private http: HttpClient) {
    }

    public getSensors(): Observable<ISensor[]> {
        return this.http.get<ISensor[]>("http://localhost:8090/sensor").pipe();
    }
    
 

    public getMeasurements() {
        this.http.get<IMeasurement[]>("http://localhost:8090/measurement").subscribe(data => {
            this.storeService.measurements = data.sort((a, b) => {
                return +a.measurement_id - +b.measurement_id;
            });
        });
    }
}
