// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// NgBootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Material
import { MatAutocompleteModule, MatBottomSheetModule, MatBottomSheetRef, MatButtonModule, MatButtonToggleModule, MatCardModule, MatChipsModule, MatDatepickerModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, MAT_BOTTOM_SHEET_DATA, MAT_DATE_LOCALE, MatDialogModule, MatRippleModule, MatSlideToggleModule, MatCheckboxModule } from '@angular/material';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { MailModule } from './apps/mail/mail.module';
import { ECommerceModule } from './apps/e-commerce/e-commerce.module';
import { UserManagementModule } from './user-management/user-management.module';
import { CoreModule } from '../../core/core.module';
import { MyPageComponent } from './my-page/my-page.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
	declarations: [MyPageComponent, ProfileComponent],
	exports: [],
	imports: [
		MatInputModule,
		MatFormFieldModule,
		MatDatepickerModule,
		MatAutocompleteModule,
		MatListModule,
		MatSliderModule,
		MatCardModule,
		MatSelectModule,
		MatButtonModule,
		MatIconModule,
		MatNativeDateModule,
		MatSlideToggleModule,
		MatCheckboxModule,
		MatMenuModule,
		MatTabsModule,
		MatTooltipModule,
		MatSidenavModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTableModule,
		MatGridListModule,
		MatToolbarModule,
		MatBottomSheetModule,
		MatExpansionModule,
		MatDividerModule,
		MatSortModule,
		MatStepperModule,
		MatChipsModule,
		MatPaginatorModule,
		MatDialogModule,
		MatRippleModule,
		MatRadioModule,
		MatTreeModule,
		MatButtonToggleModule,
		CommonModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		NgbModule,
		CoreModule,
		PartialsModule,
		MailModule,
		ECommerceModule,
		UserManagementModule,

	],
	providers: []
})
export class PagesModule {
}
