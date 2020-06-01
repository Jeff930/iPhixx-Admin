import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminService } from './admin.service';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { LeadsComponent } from './leads/leads.component';
import { CustomersComponent } from './customers/customers.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { EditBookingComponent } from './edit-booking/edit-booking.component';
import { ViewRepairComponent } from './view-repair/view-repair.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { FilterComponent } from './filter/filter.component';
import { FilterByDateComponent } from './filter-by-date/filter-by-date.component';
import { FilterByInvoiceComponent } from './filter-by-invoice/filter-by-invoice.component';
import { FilterByTypeComponent } from './filter-by-type/filter-by-type.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TicketsComponent } from './tickets/tickets.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AgentsComponent } from './agents/agents.component';
import { EditAgentComponent } from './edit-agent/edit-agent.component';
import { AddAgentComponent } from './add-agent/add-agent.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { EditTaxComponent } from './edit-tax/edit-tax.component';
import { LogisticsComponent } from './logistics/logistics.component';
import { SettingsComponent } from './settings/settings.component';
import { ProcessLeadsComponent } from './process-leads/process-leads.component';
import { AddReminderComponent } from './add-reminder/add-reminder.component';
import { AddTaxComponent } from './add-tax/add-tax.component';
import { DevicesComponent } from './devices/devices.component';
import { EditPriceComponent } from './edit-price/edit-price.component';
import { LaptopPriceComponent } from './laptop-price/laptop-price.component';
import { EditLaptopPriceComponent } from './edit-laptop-price/edit-laptop-price.component';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';
import { ViewLogisticsComponent } from './view-logistics/view-logistics.component';
import { RestockComponent } from './restock/restock.component';
import { AddDevtypeComponent } from './add-devtype/add-devtype.component';
import { EditDevtypeComponent } from './edit-devtype/edit-devtype.component';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { EditBrandComponent } from './edit-brand/edit-brand.component';
import { AddModelComponent } from './add-model/add-model.component';
import { EditModelComponent } from './edit-model/edit-model.component';
import { NetworksComponent } from './networks/networks.component';
import { AddNetworkComponent } from './add-network/add-network.component';
import { EditNetworkComponent } from './edit-network/edit-network.component';

const routes: Routes = [

  { path: 'admin', component: DashboardComponent , canActivate : [AdminService] },
  { path: 'login', component: LoginComponent },
  { path: 'leads', component: LeadsComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'edit-customer/:id', component: EditCustomerComponent },
  { path: 'edit-booking/:id/:page', component: EditBookingComponent },
  { path: 'view-repair/:id', component: ViewRepairComponent },
  { path: 'view-invoice/:id', component: ViewInvoiceComponent },
  { path: 'edit-customer', component: EditCustomerComponent },
  { path: 'invoices', component: InvoicesComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'filter-by-type', component: FilterByTypeComponent },
  { path: 'filter-by-invoice', component: FilterByInvoiceComponent },
  { path: 'filter-by-date', component: FilterByDateComponent },
  { path: 'tickets', component: TicketsComponent },
  { path: 'inventory/:page', component: InventoryComponent },
  { path: 'agents', component: AgentsComponent },
  { path: 'edit-agent/:id', component: EditAgentComponent },
  { path: 'edit-agent', component: EditAgentComponent },
  { path: 'view-customer/:id', component: ViewCustomerComponent },
  { path: 'view-ticket/:id', component: ViewTicketComponent },
  { path: 'view-logistics/:id', component: ViewLogisticsComponent },
  { path: 'edit-tax', component: EditTaxComponent },
  { path: 'logistics', component: LogisticsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'process-leads/:id', component: ProcessLeadsComponent },
  { path: 'add-reminder/:id', component: AddReminderComponent },
  { path: 'add-tax', component: AddTaxComponent },
  { path: 'devices', component: DevicesComponent },
  { path: 'edit-price/:id', component: EditPriceComponent },
  { path: 'edit-laptop-price', component: EditLaptopPriceComponent },
  { path: 'restock/:id', component: RestockComponent },
  { path: 'add-agent', component: AddAgentComponent },
  { path: 'add-devtype', component: AddDevtypeComponent },
  { path: 'edit-devtype/:id', component: EditDevtypeComponent },
  { path: 'add-brand', component: AddBrandComponent },
  { path: 'edit-brand/:id', component: EditBrandComponent },
  { path: 'add-model', component: AddModelComponent },
  { path: 'edit-model/:id', component: EditModelComponent },
  { path: 'networks', component: NetworksComponent },
  { path: 'add-network', component: AddNetworkComponent },
  { path: 'edit-network/:id', component: EditNetworkComponent },
  // { path: 'admin', component: DashboardComponent },
  // {
  //   path: 'device',
  //   component: HomeComponent,
  //   data: { title: 'Device' }
  // },
  { path: '',
    redirectTo: '/admin',
    pathMatch: 'full'
  },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
                                  DashboardComponent,
                                  SidebarComponent,
                                  NavbarComponent,
                                  FooterComponent,
                                  LoginComponent,
                                  LayoutComponent,
                                  LeadsComponent,
                                  CustomersComponent,
                                  EditCustomerComponent,
                                  InvoicesComponent,
                                  EditBookingComponent,
                                  ViewRepairComponent,
                                  ViewInvoiceComponent,
                                  NotificationsComponent,
                                  FilterComponent,
                                  FilterByDateComponent,
                                  FilterByInvoiceComponent,
                                  FilterByTypeComponent,
                                  InventoryComponent,
                                  TicketsComponent,
                                  AgentsComponent,
                                  EditAgentComponent,
                                  ViewCustomerComponent,
                                  ViewTicketComponent,
                                  EditTaxComponent,
                                  LogisticsComponent,
                                  ViewLogisticsComponent,
                                  SettingsComponent,
                                  ProcessLeadsComponent,
                                  AddReminderComponent,
                                  AddTaxComponent,
                                  DevicesComponent,
                                  EditPriceComponent,
                                  EditLaptopPriceComponent,
                                  RestockComponent

                                 ]