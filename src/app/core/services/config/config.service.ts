import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";

/**
 * This method works like facotry for load config.
 * @param configService config service instance
 */
export function configFactory(configService: ConfigService) {
  return (): Promise<any> => {
    return configService.loadConfig();
  };
}

/**
 * This service class loads configuration details.
 * class has load config method which is called thourgh configFacotry which futher being inovked at
 * application start up in app module.
 */
@Injectable()
export class ConfigService {

  private configuration: any;

  constructor(private http: HttpClient) {
    this.configuration = environment;
  }
  /**
   * method return configuration loaded fron env specific config and default to environment
   */
  public getConfig(): any {
    return this.configuration;
  }

  /**
   * This method loads config file from which loaded env specifc values.
   */
  loadConfig(): Promise<any> {
    const url = "../../../../../assets/config.json";
    console.log("load config is called.");
    return this.http
      .get<any>(url)
      .toPromise()
      .then(configuration => {
        if (configuration) {
          console.log("config loaded with env data successfully.");
          this.configuration = configuration;
        }
        console.log("load config ended.");
      }).catch(err => {
        console.log("config loading failed.");
        console.log(err);
      });
  }
}
