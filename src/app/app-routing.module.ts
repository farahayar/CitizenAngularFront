import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InscriptionComponent } from './components/user/inscription/inscription.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AjoutPostComponent } from './components/ajout-post/ajout-post.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PostvalideComponent } from './components/admin/postvalide/postvalide.component';
import { PostsComponent } from './components/posts/posts/posts.component';
import { MapComponent } from './components/map/map.component';
import { PostModifComponent } from './components/admin/post-modif/post-modif.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { ProfilesComponent } from './components/user/profiles/profiles.component';
import { PostsSignalesComponent } from './components/admin/posts-signales/posts-signales.component';
import { ListesUsersComponent } from './components/admin/listes-users/listes-users.component';
import { UserSignalesComponent } from './components/admin/user-signales/user-signales.component';
import { AdminGuard } from './guards/admin.guard';
import { VisiteurComponent } from './components/visiteur/visiteur.component';
import { UserGuard } from './guards/user.guard';


const routes: Routes = [
  
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'visiteur',
    component: VisiteurComponent,
  },
  {
    path: 'inscription',
    component: InscriptionComponent,
  },
  {
    path: 'in',
    component: SidebarComponent,
    children: [
      {
        path: 'home',
        component: MapComponent,
        canActivate:[UserGuard]
      },
      {
        path: 'ajoutPost',
        component: AjoutPostComponent,
        canActivate:[UserGuard]
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate:[AdminGuard]
      },
      {
        path: 'postValide',
        component: PostvalideComponent,
        canActivate:[AdminGuard]
      },
      {
        path: 'posts',
        component: PostsComponent,
      },
      {
        path: 'postModif',
        component: PostModifComponent,
        canActivate:[AdminGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate:[UserGuard]
      },
      {
        path: 'profiles',
        component: ProfilesComponent,
      },
      {
        path: 'postsSignales',
        component: PostsSignalesComponent,
        canActivate:[AdminGuard]
      },
      {
        path: 'listeUsers',
        component: ListesUsersComponent,
        canActivate:[AdminGuard]
      },
      {
        path: 'usersSignales',
        component: UserSignalesComponent,
        canActivate:[AdminGuard]
      }

    ]

  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
