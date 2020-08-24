import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { WeatherService } from './main/service/api.weather.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { GeolocationService } from './main/service/geolocation.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MapsComponent } from './maps/maps.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ImgService } from './main/service/img.service';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { GeoEffects } from './store/effects/geo.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ImgEffects } from './store/effects/img.effects';

@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
		MapsComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatInputModule,
		MatIconModule,
		MatProgressSpinnerModule,
		StoreModule.forRoot(reducer),
		StoreRouterConnectingModule.forRoot(),
		EffectsModule.forRoot([GeoEffects, ImgEffects]),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
	],
	providers: [WeatherService, GeolocationService, ImgService],
	bootstrap: [AppComponent]
})
export class AppModule { }
