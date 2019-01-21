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


const routes: Routes = [

  { path: 'admin', component: DashboardComponent , canActivate : [AdminService] },
  { path: 'login', component: LoginComponent },
  { path: 'leads', component: LeadsComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'edit-customer/:id', component: EditCustomerComponent },
  { path: 'edit-booking/:id', component: EditBookingComponent },
  { path: 'view-repair/:id', component: ViewRepairComponent },
  { path: 'view-invoice/:id', component: ViewInvoiceComponent },
  { path: 'edit-customer', component: EditCustomerComponent },
  { path: 'invoices', component: InvoicesComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'filter-by-type', component: FilterByTypeComponent },
  { path: 'filter-by-invoice', component: FilterByInvoiceComponent },
  { path: 'filter-by-date', component: FilterByDateComponent },
  { path: 'tickets', component: TicketsComponent },
  { path: 'inventory', component: InventoryComponent },
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
                                 ]