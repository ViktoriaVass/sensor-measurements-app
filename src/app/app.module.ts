import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'
import { NativeScriptHttpClientModule } from '@nativescript/angular'
import { HttpClientModule } from '@angular/common/http'
import { NativeScriptUIChartModule } from 'nativescript-ui-chart/angular';


import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MeasurementComponent } from './measurement/measurement.component'
import { SensorComponent } from './sensor/sensor.component'
import { ChartComponent } from './chart/chart.component'
import { MenuComponent } from './menu/menu.component';


@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent, 
    MeasurementComponent, 
    SensorComponent,
    ChartComponent,
    MenuComponent
  ],
    imports: [
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptHttpClientModule,
    HttpClientModule,
    NativeScriptUIChartModule
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
