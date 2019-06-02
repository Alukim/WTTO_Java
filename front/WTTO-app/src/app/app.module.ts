import { BackendService } from './backend.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { NewDocumentComponent } from './new-document/new-document.component';
import { ViewDocumentComponent } from './view-document/view-document.component';
import { UpdateAddressComponent } from './view-document/UpdateAddressComponent';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    LayoutComponent,
    DashboardComponent,
    NewDocumentComponent,
    ViewDocumentComponent,
    UpdateAddressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule ,
    CommonModule,
    HttpClientModule
  ],
  providers: [BackendService],
  bootstrap: [AppComponent],
  entryComponents: [UpdateAddressComponent]
})
export class AppModule { }
