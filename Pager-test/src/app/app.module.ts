import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagerModule } from '@progress/kendo-angular-pager';
import { AppComponent } from './app.component';
import { DestinationComponent } from './destination.component';

@NgModule({
    bootstrap:    [AppComponent],
    declarations: [AppComponent, DestinationComponent],
    imports:      [BrowserModule, BrowserAnimationsModule, PagerModule, FormsModule]
})
export class AppModule {}
