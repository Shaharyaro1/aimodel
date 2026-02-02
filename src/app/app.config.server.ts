import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { config } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()],
};

export const appServerConfig = mergeApplicationConfig(config, serverConfig);

export const AppServerConfig = () => import('./app').then((m) => m.AppComponent);
