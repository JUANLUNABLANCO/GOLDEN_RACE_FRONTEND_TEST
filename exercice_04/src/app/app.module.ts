import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/components/header/header.component';
import { SidebarComponent } from './layout/components/sidebar/sidebar.component';
import { MainComponent } from './layout/components/main/main.component';
import { FeaturedComponent } from './layout/components/featured/featured.component';
import { ArticlesComponent } from './layout/components/articles/articles.component';
import { CardImageComponent } from './shared/card-image/card-image.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    MainComponent,
    FeaturedComponent,
    ArticlesComponent,
    CardImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
