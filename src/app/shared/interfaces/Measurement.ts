import { ISensor } from "./Sensor";

export interface IMeasurement {
    measurement_id: number;
    humidity: number;
    temperature: number,
    timestamp: Date;
    sensorEntity: ISensor;
}