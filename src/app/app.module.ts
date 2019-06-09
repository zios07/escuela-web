import { DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatGridListModule, MatIconModule, MatInputModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/common/nav/nav.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { AuthenticationService } from './services/authentication.service';
import { RequestInterceptorService } from './services/request-interceptor.service';
import { FooterComponent } from './components/common/footer/footer.component';
import { ContactComponent } from './components/pages/shared/contact/contact.component';
import { AddEnfantComponent } from './components/pages/parent/add-enfant/add-enfant.component';
import { PanierComponent } from './components/pages/shared/panier/panier.component';
import { HomeComponent } from './components/pages/shared/home/home.component';
import { CoursesComponent } from './components/pages/eleve/courses/courses.component';
import { ActivitiesComponent } from './components/pages/eleve/activities/activities.component';
import { RecompensesComponent } from './components/pages/eleve/recompenses/recompenses.component';
import { BoutiqueComponent } from './components/pages/shared/boutique/boutique.component';
import { EnfantsComponent } from './components/pages/parent/enfants/enfants.component';
import { TeachersComponent } from './components/pages/shared/teachers/teachers.component';
import { TestComponent } from './components/pages/eleve/test/test.component';
import { VideoCourseComponent } from './components/pages/eleve/video-course/video-course.component';
import { TextCourseComponent } from './components/pages/eleve/text-course/text-course.component';
import { ProfilComponent } from './components/pages/eleve/profil/profil.component';
import { ParametresComponent } from './components/pages/eleve/parametres/parametres.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FooterComponent,
    CoursesComponent,
    ActivitiesComponent,
    RecompensesComponent,
    BoutiqueComponent,
    EnfantsComponent,
    ContactComponent,
    AddEnfantComponent,
    PanierComponent,
    TeachersComponent,
    TestComponent,
    VideoCourseComponent,
    TextCourseComponent,
    ProfilComponent,
    ParametresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    MatTabsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    ToastrModule.forRoot(),
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    DatePipe,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
