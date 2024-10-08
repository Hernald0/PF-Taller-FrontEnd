
// Angular
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Module
import { AppRoutingModule } from './app-routing.module';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { NgxPaginationModule } from 'ngx-pagination';
import { DdrBlockListModule } from 'ddr-block-list';
import { DdrConfigurationModule} from 'ddr-configuration';

// Services
import { DdrConfigurationService } from 'ddr-configuration';

// Pipes
import { SanitizePipe } from './pipes/sanitize.pipe';

// Components
import { AppComponent } from './app.component';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { EventsComponent } from './components/content/events/events.component';
import { ContentComponent } from './components/content/content.component';
import { HeaderComponent } from './components/header/header.component';
import { AddEditEventComponent } from './components/content/add-edit-event/add-edit-event.component';
import { LoginComponent } from './components/login/login.component';
import { ManageEventsComponent } from './components/content/manage-events/manage-events.component';
//-import { MenubarComponent } from './menubar/menubar.component';
import { MenubarComponent } from './menubar/menubar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

//-----------------------------
import {PersonasModule} from './components/personas/personas.module';


import { AppPrimeNgModule } from './app.primeng.module';
import {ConfirmationService, MessageService} from 'primeng/api';

import { ComponentsModule } from './components/components.module';
import { AuthService } from './services/auth2.service';
import { AuthGuard } from './components/auth/auth.guard';

//import { LoginGuard } from './services/login-guard.service'
//-----------------------------

const firebaseConfig = {
  apiKey: "AIzaSyBpg9mbnEJ1ZW4WQCo29l8ctVTRzM1tX7w",
  authDomain: "events-app-2713a.firebaseapp.com",
  databaseURL: "https://events-app-2713a.firebaseio.com",
  projectId: "events-app-2713a",
  storageBucket: "",
  messagingSenderId: "230291896609",
  appId: "1:230291896609:web:bde960c429ec5def1da660",
  measurementId: "G-KZ88DN25L2"
};

export function configFactory(provider: DdrConfigurationService) {
  return () => provider.getDataFromJSON('./assets/locale/locale.json');
}

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    ContentComponent,
    HeaderComponent,
    AddEditEventComponent,
    LoginComponent,
    SanitizePipe,
    ManageEventsComponent,
    MenubarComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    FormsModule,
    CalendarModule,
    CheckboxModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    DdrBlockListModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    PersonasModule,
    ComponentsModule, 
    AppPrimeNgModule
  ],
  providers: [
    AuthService, 
    AuthGuard,
    ConfirmationService, 
    MessageService,
    DdrConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [DdrConfigurationService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
