//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ToasterModule, ToasterService } from 'angular2-toaster';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TokenInterceptor } from "./_interceptors/token.interceptor";
import { SelectModule } from 'ng-select';
import { MatDialogModule, MatDialogConfig } from '@angular/material/dialog';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
//components
import { AppComponent } from './app.component';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { UserProfileComponent } from './components/profile/user-profile/user-profile.component';
import { LoginPageComponent } from './components/authorization/login-page/login-page.component';
import { RegisterPageComponent } from './components/authorization/register-page/register-page.component';
import { UsersListComponent } from './components/admin/users-list/users-list.component';
import { InfoDialog } from "./components/dialogs/info-dialog/info-dialog.component";
import { EditDialog } from "./components/dialogs/edit-dialog/edit-dialog.component";
import { EditUserFormComponent } from './components/dialogs/edit-user-form/edit-user-form.component';
import { HomeComponent } from "./components/home/home.component";
import { TeacherDashboardComponent } from "./components/teacher/teacher-dashboard/teacher-dashboard.component";
import { PermissionErrorComponent } from "./components/error/permission-error/permission-error.component";
import { SubjectLevelConfigComponent } from './components/admin/subject-level-config/subject-level-config.component';
//services
import { AuthenticationService } from "./_services/authentication.service";
import { RoleService } from "./_services/role.service";
import { BaseTosterService } from "./_services/base-toaster.service";
import { ArrayValuesPipe } from './_pipes/array-values.pipe';
import { AuthGuard } from "./_guards/auth.guard";
import { UserService } from "./_services/user.service";
import { RoleGuard } from 'app/_guards/role.guard';
import { SubjectLevelService } from './_services/subjectlevel.service';
import { AddSubjectDialog } from 'app/components/dialogs/add-subject-dialog/add-subject-dialog.component';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
      DashboardComponent,
      TeacherDashboardComponent,
      PermissionErrorComponent,
      EditUserFormComponent,
    UserProfileComponent,
    LoginPageComponent,
      RegisterPageComponent,
      ArrayValuesPipe,
      UsersListComponent,
      InfoDialog,
      EditDialog,
      AddSubjectDialog,
      HomeComponent,
      SubjectLevelConfigComponent,
    ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    ComponentsModule,
      RouterModule,
      TranslateModule.forRoot(
          {
              loader:
              {
                  provide: TranslateLoader,
                  useFactory: HttpLoaderFactory,
                  deps: [HttpClient]
              }
          }),
      AppRoutingModule,
      BrowserAnimationsModule,
      ToasterModule,

      SelectModule,
      MatDialogModule,
      MatButtonModule,
      MatCheckboxModule
  ],
  entryComponents: [
      InfoDialog,
      EditDialog,
      AddSubjectDialog
  ],
  exports: [TranslateModule],
  providers: [
      AuthenticationService,
      RoleService,
      BaseTosterService,
      ToasterService,
      {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
      },
      { provide: MatDialogConfig, useValue: { hasBackdrop: false } },
      AuthGuard,
      RoleGuard,
      UserService,
      SubjectLevelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
    //constructor(overlayContainer: OverlayContainer) {
    //    overlayContainer.getContainerElement()
    //        .classList.add('app-dark-theme');
    //}
}

