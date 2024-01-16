import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { MeasurementComponent } from './measurement/measurement.component'
import { SensorComponent } from './sensor/sensor.component'

const routes: Routes = [
  { path: '', redirectTo: '/sensor', pathMatch: 'full' },
  { path: 'sensor', component: SensorComponent },
  { path: 'sensor/:id/measurements', component: MeasurementComponent },
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
