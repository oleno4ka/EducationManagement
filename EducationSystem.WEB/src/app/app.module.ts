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
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { UsersListComponent } from './users-list/users-list.component';
import { InfoDialog } from "./info-dialog/info-dialog.component";
import { EditDialog } from "./edit-dialog/edit-dialog.component";
import { EditUserFormComponent } from './edit-user-form/edit-user-form.component';
import { HomeComponent } from "./home/home.component";
import { TeacherDashboardComponent } from "./teacher-dashboard/teacher-dashboard.component";
import { PermissionErrorComponent } from "./permission-error/permission-error.component";
//services
import { AuthenticationService } from "./_services/authentication.service";
import { RoleService } from "./_services/role.service";
import { BaseTosterService } from "./_services/base-toaster.service";
import { ArrayValuesPipe } from './_pipes/array-values.pipe';
import { AuthGuard } from "./_guards/auth.guard";
import { UserService } from "./_services/user.service";
import { RoleGuard } from 'app/_guards/role.guard';

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
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    LoginPageComponent,
      RegisterPageComponent,
      ArrayValuesPipe,
      UsersListComponent,
      InfoDialog,
      EditDialog,
      HomeComponent,

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
      EditDialog
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
      UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
    //constructor(overlayContainer: OverlayContainer) {
    //    overlayContainer.getContainerElement()
    //        .classList.add('app-dark-theme');
    //}
}

