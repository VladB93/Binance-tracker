import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IgxGridModule, IgxProgressBarModule, IgxDialogModule, IgxSelectModule, IgxInputGroupModule, IgxRadioModule } from 'igniteui-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaggedCoinsGridComponent } from './components/tagged-coins-grid/tagged-coins-grid.component';
import { HomeComponent } from './components/home/home.component';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FilterFormComponent,
    TaggedCoinsGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    IgxGridModule,
    IgxDialogModule,
    FormsModule,
    IgxInputGroupModule,
    IgxProgressBarModule,
    BrowserAnimationsModule,
    IgxSelectModule,
    IgxRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
