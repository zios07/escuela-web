import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { HomeComponent } from './components/pages/shared/home/home.component';
import { BoutiqueComponent } from './components/pages/shared/boutique/boutique.component';
import { PanierComponent } from './components/pages/parent/panier/panier.component';
import { TeachersComponent } from './components/pages/shared/teachers/teachers.component';
import { AddEnfantComponent } from './components/pages/parent/add-enfant/add-enfant.component';
import { EnfantsComponent } from './components/pages/parent/enfants/enfants.component';
import { CoursesComponent } from './components/pages/eleve/courses/courses.component';
import { ActivitiesComponent } from './components/pages/eleve/activities/activities.component';
import { RecompensesComponent } from './components/pages/eleve/recompenses/recompenses.component';
import { ProfilComponent } from './components/pages/eleve/profil/profil.component';
import { ParametresComponent } from './components/pages/eleve/parametres/parametres.component';
import { ContactComponent } from './components/pages/shared/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'boutique', component: BoutiqueComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'activities', component: ActivitiesComponent },
  { path: 'recompenses', component: RecompensesComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'parametres', component: ParametresComponent },
  { path: 'cours', component: CoursesComponent },
  { path: 'cours/video', component: EnfantsComponent },
  { path: 'cours/text', component: EnfantsComponent },
  { path: 'test', component: EnfantsComponent },
  { path: 'enfants', component: EnfantsComponent },
  { path: 'enfants/add', component: AddEnfantComponent },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
