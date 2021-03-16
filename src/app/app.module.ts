import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InscriptionComponent } from './components/user/inscription/inscription.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AjoutPostComponent } from './components/ajout-post/ajout-post.component';
import { MapComponent } from './components/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AdminComponent } from './components/admin/admin/admin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PostvalideComponent } from './components/admin/postvalide/postvalide.component';
import { DataTablesModule } from 'angular-datatables';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostsComponent } from './components/posts/posts/posts.component';
import { PostModifComponent } from './components/admin/post-modif/post-modif.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { ProfilesComponent } from './components/user/profiles/profiles.component';
import { PostsSignalesComponent } from './components/admin/posts-signales/posts-signales.component';
import { ListesUsersComponent } from './components/admin/listes-users/listes-users.component';
import { UserSignalesComponent } from './components/admin/user-signales/user-signales.component';
import { AdminGuard } from './guards/admin.guard';
import { VisiteurComponent } from './components/visiteur/visiteur.component';
import { NavVisiteurComponent } from './components/nav-visiteur/nav-visiteur.component';

import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { MessagingService } from './services/messaging.service';
import { environment } from '../environments/environment';
import { AsyncPipe } from '../../node_modules/@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    HomeComponent,
    LoginComponent,
    AjoutPostComponent,
    MapComponent,
    AdminComponent,
    SidebarComponent,
    PostvalideComponent,
    PostsComponent,
    PostModifComponent,
    ProfileComponent,
    ProfilesComponent,
    PostsSignalesComponent,
    ListesUsersComponent,
    UserSignalesComponent,
    VisiteurComponent,
    NavVisiteurComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    LeafletModule,
    DataTablesModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    AdminGuard,
    MessagingService,
    AsyncPipe
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
