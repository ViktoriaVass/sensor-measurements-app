import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { MeasurementComponent } from './measurement/measurement.component'
import { SensorComponent } from './sensor/sensor.component'
import { ChartComponent } from './chart/chart.component'
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: '', redirectTo: '/sensor', pathMatch: 'full' },
  { path: 'sensor', component: SensorComponent },
  { path: 'sensor/:id/measurements', component: MeasurementComponent },
  { path: 'chart/:id/measurements', component: ChartComponent },
  { path: 'menu', component: MenuComponent },
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
