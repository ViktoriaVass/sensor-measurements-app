import { ISensor } from "./Sensor";

export interface IMeasurement {
    formattedDateTime: string;
    measurement_id: number;
    humidity: number;
    temperature: number,
    timestamp: Date;
    sensorEntity: ISensor;
}