import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'
import { NativeScriptHttpClientModule } from '@nativescript/angular'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ItemsComponent } from './item/items.component'
import { ItemDetailComponent } from './item/item-detail.component'
import { MeasurementComponent } from './measurement/measurement.component'
import { SensorComponent } from './sensor/sensor.component'


@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent, 
    ItemsComponent, 
    ItemDetailComponent, 
    MeasurementComponent, 
    SensorComponent,
  ],
    imports: [
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptHttpClientModule,
    HttpClientModule,
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
