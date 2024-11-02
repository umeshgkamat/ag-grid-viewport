import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from '@ag-grid-community/angular';
import { AppComponent } from './app.component';
import { CustomGroupCellRenderer } from './group-cell-renderer';

/* @NgModule({
  declarations: [
    AppComponent,
    CustomGroupCellRenderer
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([CustomGroupCellRenderer])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } */