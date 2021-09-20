export interface sunResult
{
    results: sunRiseSet
}

export interface sunRiseSet
{
    sunrise: string,
    sunset: string,
    solar_noon: Date,
    day_length: Date,
    civil_twilight_begin: Date,
    civil_twilight_end: Date,
    nautical_twilight_begin: Date,
    nautical_twilight_end: Date,
    astronomical_twilight_begin: Date,
    astronomical_twilight_end: Date
}