import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AdminService } from './admin.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { DataTableModule } from 'angular-6-datatable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { EditBookingComponent } from './edit-booking/edit-booking.component';
import { ViewRepairComponent } from './view-repair/view-repair.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TimelineComponent } from './timeline/timeline.component';
import { FilterComponent } from './filter/filter.component';
import { ConfirmPaymentComponent } from './confirm-payment/confirm-payment.component';
import { FilterByInvoiceComponent } from './filter-by-invoice/filter-by-invoice.component';
import { FilterByDateComponent } from './filter-by-date/filter-by-date.component';
import { FilterByTypeComponent } from './filter-by-type/filter-by-type.component';
import { TicketsComponent } from './tickets/tickets.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { EditTaxComponent } from './edit-tax/edit-tax.component';
import { LogisticsComponent } from './logistics/logistics.component';
import { SettingsComponent } from './settings/settings.component';
import { ProcessLeadsComponent } from './process-leads/process-leads.component';
// import { NotificationComponent } from './notification/notification.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    EditBookingComponent,
    ViewRepairComponent,
    ViewInvoiceComponent,
    NotificationsComponent,
    TimelineComponent,
    FilterComponent,
    FilterByInvoiceComponent,
    FilterByDateComponent,
    FilterByTypeComponent,
    TicketsComponent,
    InventoryComponent,
    ViewCustomerComponent,
    ConfirmPaymentComponent,
    EditTaxComponent,
    LogisticsComponent,
    SettingsComponent,
    ProcessLeadsComponent,
    // NotificationComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    DataTableModule,
    BrowserAnimationsModule,
    SatPopoverModule,
    NgxSmartModalModule.forRoot(),
    ModalDialogModule.forRoot()
  ],
  providers: [AdminService, NgxSmartModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
