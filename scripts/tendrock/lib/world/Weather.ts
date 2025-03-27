import {WeatherType, world} from "@minecraft/server";


export class Weather {
  private currentWeather: WeatherType;
  private static PropertyKey = "tendrock:weather";

  constructor() {
    this.initCurrentWeather();
    world.afterEvents.weatherChange.subscribe(({newWeather}) => {
      // console.log(`Weather changed to ${newWeather}`);
      this.currentWeather = newWeather;
      world.setDynamicProperty(Weather.PropertyKey, newWeather);
    });
  }

  private initCurrentWeather() {
    const savedWeather = world.getDynamicProperty(Weather.PropertyKey);
    this.currentWeather = savedWeather as WeatherType ?? WeatherType.Clear;
  }

  public isRaining() {
    return this.currentWeather === WeatherType.Rain || this.currentWeather === WeatherType.Thunder;
  }

  public isThunder() {
    return this.currentWeather === WeatherType.Thunder;
  }

  public isClear() {
    return this.currentWeather === WeatherType.Clear;
  }

  public getCurrent() {
    return this.currentWeather;
  }
}

export const weather = new Weather();


