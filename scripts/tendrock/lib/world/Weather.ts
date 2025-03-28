import {Dimension, WeatherType} from "@minecraft/server";


export class Weather {

  public static isRaining(dimension: Dimension) {
    const currentWeather = dimension.getWeather();
    return currentWeather === WeatherType.Rain || currentWeather === WeatherType.Thunder;
  }

  public static isThunder(dimension: Dimension) {
    const currentWeather = dimension.getWeather();
    return currentWeather === WeatherType.Thunder;
  }

  public static isClear(dimension: Dimension) {
    const currentWeather = dimension.getWeather();
    return currentWeather === WeatherType.Clear;
  }
}

