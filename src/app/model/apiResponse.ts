import { clouds } from "../model/clouds";
import { coord } from "../model/coord";
import { main } from "../model/main";
import { weather } from "../model/weather";
import { wind } from "../model/wind";
import { sys } from "../model/sys";

export interface apiResponse
{
    coord: coord;
    weather: weather[];
    base: string;
    main: main;
    visibility: number;
    wind: wind;
    clouds: clouds;
    dt: number;
    sys: sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}