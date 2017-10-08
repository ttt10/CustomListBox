import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DataSvc } from './service/data.service';

import { CustomListBoxComponent } from './custom-list-box/custom-list-box.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomListBoxComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ DataSvc ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
