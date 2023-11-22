import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EditorModule } from './editor/editor.module'; 
import {AppComponent} from './app.component';
import {TestComponent} from './test/test.component';
import {TestModule} from './test/test.module';
import {EditorComponent } from './editor/editor.component'

@NgModule({
  declarations: [AppComponent, TestComponent, EditorComponent],
  imports: [BrowserModule, EditorModule, TestModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
