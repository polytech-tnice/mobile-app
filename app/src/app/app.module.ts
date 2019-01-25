import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { env } from './environment';
import { GamePage } from '../pages/game/game';
import { WindEffectGeneratorPage } from '../pages/wind-effect-generator/wind-effect-generator';
import { ActionListComponent } from '../components/action-list/action-list';
import { ActionStepVisualizerComponent } from '../components/action-step-visualizer/action-step-visualizer';
import { WindsockComponent } from '../components/windsock/windsock';
import { WindEffectProvider } from '../providers/wind-effect/wind-effect';
import { CompassComponent } from '../components/compass/compass';

const config: SocketIoConfig = { url: `${env.baseUrl}:${env.port}`, options: {}}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GamePage,
    WindEffectGeneratorPage,
    ActionListComponent,
    ActionStepVisualizerComponent,
    WindsockComponent,
    CompassComponent 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GamePage,
    WindEffectGeneratorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WindEffectProvider
  ]
})
export class AppModule {}
