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
import { AlertsModule } from 'angular-alert-module';

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
import { AddReminderComponent } from './add-reminder/add-reminder.component';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { AddTaxComponent } from './add-tax/add-tax.component';
import { DevicesComponent } from './devices/devices.component';
import { EditPriceComponent } from './edit-price/edit-price.component';
import { LaptopPriceComponent } from './laptop-price/laptop-price.component';
import { EditLaptopPriceComponent } from './edit-laptop-price/edit-laptop-price.component';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';
import { ViewLogisticsComponent } from './view-logistics/view-logistics.component';
import { RestockComponent } from './restock/restock.component';
import { AddAgentComponent } from './add-agent/add-agent.component';
import { LocationComponent } from './location/location.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { EditLocationComponent } from './edit-location/edit-location.component';

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
    AddReminderComponent,
    AddBookingComponent,
    AddTaxComponent,
    DevicesComponent,
    EditPriceComponent,
    LaptopPriceComponent,
    EditLaptopPriceComponent,
    ViewTicketComponent,
    ViewLogisticsComponent,
    RestockComponent,
    AddAgentComponent,
    LocationComponent,
    AddLocationComponent,
    EditLocationComponent

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
    ModalDialogModule.forRoot(),
    AlertsModule.forRoot()
  ],
  providers: [AdminService, NgxSmartModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
