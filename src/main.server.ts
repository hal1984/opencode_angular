import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/presentation/app';
import { config } from './app/presentation/app.config.server';

const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(App, config, context);

export default bootstrap;
