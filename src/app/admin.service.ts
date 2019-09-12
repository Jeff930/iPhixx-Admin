import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse , HttpParams} from '@angular/common/http';

export interface Leads {
	bookings : Array<any>;
  total_page : any;
  page: any;
}

export interface Customers {
  customers : Array<any>;
  total_page : any;
  page: any;
}

export interface Agents {
  agents: Array<any>;
  total_page: any;
  page: any;
}

export interface Invoices {
  invoices: Array<any>;
  total_page: any;
  page: any;
}

export interface Tickets {
  tickets: Array<any>;
  total_page: any;
  page: any;
}

export interface Inventory {
	inventory: Array<any>;
  total_page: any;
  page: any;
}

export interface Customer {
  customer_fname: any;
  customer_lname: any;
  email: any;
  birthdate: any;
  phone: any;
  location: any;
}

export interface Counter {
  count: any;
}

export interface Repair {
  dev_type: any;
  dev_model: any;
  color: any;
  carrier: any;
  selectedRepair: any;
}


@Injectable({
  providedIn: 'root'
})
export class AdminService implements CanActivate  {
  //
  totalCustomers;
// User
    user: any;
// leads rquirements
  pages: any;
  leadsPage  = new Object();
  pageActive: number;

// customers rquirements
  customerspages: any;
  customersPage  = new Object();
  customerspageActive: number;
  customersAction: string;

  agentspages: any;
  agentsPage  = new Object();
  agentspageActive: number;
  agentsAction: string;

  invoicespages: any;
  invoicesPage  = new Object();
  invoicePageActive: number;

  ticketPages: any;
  ticketsPage  = new Object();
  ticketPageActive: number;

  inventoryPages: any;
  inventoryPage  = new Object();
  inventoryPageActive: number;

  notifs = ['Repair with Invoice No.10566 has been marked as paid on 2018-12-11 03:04:24',
  'Repair with Invoice No.10566 has been marked as resolved on 2018-12-10 11:21:20',
  'Repair with Invoice No.10566 has been marked as ongoing on 2018-12-10 11:20:50',
  'Repair with Invoice No.10566 has been created on 2018-12-07 08:04:32',
  ];

  type = '';

  global = {
    leads : [],
    customers : [],
    invoices : [],
    tickets : [],
    owners : [],
    owner : [],
    inventory: [],
    agents: [],
  };
  notif = '';
  from = '';

  constructor(private router: Router , public http: HttpClient) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if (localStorage.getItem('authenticated')) {
        return true;
        // location.href = './admin';

} else {
    this.router.navigate(['/login'], {
    queryParams: {
    return: state.url
    }
        });

return false;
}
  }

  getTotalCustomers() {
    for (let index = 0; index !== 1 ;) {
      this.getCustomers(1).subscribe( res => {
        if (!res) {index = 1; }
        this.totalCustomers += res.customers.length;
      }, err => {
        index = 1;
      });
    }
    return this.totalCustomers;
  }

  getLeads(page =  1) {
      return this.http.get<Leads>('https://admin.iphixx.com/api/v1/bookings/?page=' + page);
  }

  getTax() {
      return this.http.get<Leads>('https://admin.iphixx.com/api/v1/bookings/tax');
  }
  getCustomers(page =  1) {
   return this.http.get<Customers>('https://admin.iphixx.com/api/v1/customers/?page=' + page);

  }

  getAgents(page) {
    return this.http.get<Agents>('https://admin.iphixx.com/api/v1/customers/agents/?page=' + page);
   }

  getInvoices(page =  1) {
    return this.http.get<Invoices>('https://admin.iphixx.com/api/v1/bookings/invoices/?page=' + page);
  }

  getTickets(page =  1) {
    return this.http.get<Tickets>('https://admin.iphixx.com/api/v1/bookings/tickets/?page=' + page);
  }

  getInventory(page =  1) {
  	return this.http.get<Inventory>('https://admin.iphixx.com/api/v1/bookings/inventory/?page=' + page);
  }

  getOwner(id) {
    return this.http.get<Customer>('https://admin.iphixx.com/api/v1/bookings/owner/' + id);
  }

  getRepair(id) {
    return this.http.get<Repair>('https://admin.iphixx.com/api/v1/bookings/repair/' + id);
  }

  getOneTax(id) {
    return this.http.get<Leads>('https://admin.iphixx.com/api/v1/bookings/get-tax/' + id);
  }

  getModels() {
    return this.http.get<Leads>('https://admin.iphixx.com/api/v1/bookings/phone');
  }
  getTablets() {
    return this.http.get<Leads>('https://admin.iphixx.com/api/v1/bookings/tablet');
  }

  getCustomersCount() { return this.http.get('https://admin.iphixx.com/api/v1/customers/customerscount/'); }

  getInventoryCount() { return this.http.get<Counter>('https://admin.iphixx.com/api/v1/bookings/inventorycount/'); }

  getInvoicesCount() { return this.http.get<Counter>('https://admin.iphixx.com/api/v1/bookings/invoicescount/'); }

  getTicketsCount() { return this.http.get<Counter>('https://admin.iphixx.com/api/v1/bookings/ticketcount/'); }

//  updateBooking(lead){
//    console.log(lead);

//    let body = new HttpParams()
//     .set('fullname', lead.fullname)
//     .set('email', lead.email)
//     .set('phone', lead.phone)
//     .set('location', lead.location)
//     .set('birthdate', lead.birthdate)

//    return this.http.put('http://admin.iphixx.com/api/v1/bookings/'+lead.id,
//      body.toString(), { headers : { 'Content-Type' : 'application/x-www-form-urlencoded' } ,params : {  } })
//  }

 addCustomer(customer) {
   console.log(customer);
   const body = new HttpParams()
    .set('customer_fname', customer.customer_fname)
    .set('customer_lname', customer.customer_lname)
    .set('email', customer.email)
    .set('phone', customer.phone)
     .set('address', customer.address)
     .set('birthdate', customer.birthdate)
     .set('location', customer.location);

    return this.http.post('https://admin.iphixx.com/api/v1/customers/add',
     body.toString(), { headers : { 'Content-Type' : 'application/x-www-form-urlencoded' } ,params : {  } })
 }

 addTax(tax) {
   console.log(tax);
   const body = new HttpParams()
     .set('tax_name', tax.tax_name)
     .set('tax_value', tax.tax_value);

   return this.http.post('https://admin.iphixx.com/api/v1/bookings/add-tax',
     body.toString(), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, params: {} });
 }

 addAgent(agent) {
  console.log(agent);
  const body = new HttpParams()
   .set('agent_fname', agent.agent_fname)
   .set('agent_lname', agent.agent_lname)
   .set('agent_username', agent.agent_username)
   .set('email', agent.email)
   .set('password', agent.password)
   .set('phone', agent.phone)
   .set('pin', agent.pin)
   .set('store_assigned', agent.store_assigned)
  //  .set('city', customer.city)
  //  .set('state', customer.state)
  //  .set('zip', customer.zip)
   return this.http.post('http://admin.iphixx.com/api/v1/customers/agents/add',
    body.toString(), { headers : { 'Content-Type' : 'application/x-www-form-urlencoded' } ,params : {  } })
}

  deleteTax(id) {
    console.log(id);
    return this.http.delete('http://admin.iphixx.com/api/v1/bookings/delete-tax/' + id);
  }
 deleteCustomer(id) {
   console.log(id);
   return this.http.delete('http://admin.iphixx.com/api/v1/customers/'+id);
 }

 deleteAgent(id) {
  console.log(id);
  return this.http.delete('http://admin.iphixx.com/api/v1/customers/agents/'+id);
}

  deleteBooking(id) {
    console.log(id);
    return this.http.delete('https://admin.iphixx.com/api/v1/bookings/'+id);
  }

 updateTax(id , tax) {
   console.log(tax);

   const body = new HttpParams()
     .set('tax_name', tax.tax_name)
     .set('tax_value', tax.tax_value);

   return this.http.put('http://admin.iphixx.com/api/v1/bookings/edit-tax/' + id,
     body.toString(), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, params: {} });
 }


 updateCustomer(customer){
  console.log(customer);

  const body = new HttpParams()
   .set('customer_fname', customer.customer_fname)
   .set('customer_lname', customer.customer_lname)
   .set('email', customer.email)
   .set('phone', customer.phone)
   .set('location', customer.location)
   .set('birthdate', customer.birthdate);
  //  .set('address', customer.address)
  //  .set('address_2', customer.address2)
  //  .set('city', customer.city)
  //  .set('state', customer.state)
  //  .set('zip', customer.zip)

  return this.http.put('http://admin.iphixx.com/api/v1/customers/'+customer.customer_id,
    body.toString(), { headers : { 'Content-Type' : 'application/x-www-form-urlencoded' } ,params : {  } })
}

updateAgent(agent) {
  console.log(agent);

  const body = new HttpParams()
   .set('agent_fname', agent.agent_fname)
   .set('agent_lname', agent.agent_lname)
   .set('agent_username', agent.agent_username)
   .set('agent_email', agent.agent_email)
   .set('agent_phone', agent.agent_phone)
   .set('agent_location',agent.agent_location)
   .set('agent_pin',agent.agent_pin)
   .set('agent_password',agent.agent_password)
   .set('store_assigned',agent.store_assigned)
  // .set('birthdate', customer.birthdate)
  //  .set('address', customer.address)
  //  .set('address_2', customer.address2)
  //  .set('city', customer.city)
  //  .set('state', customer.state)
  //  .set('zip', customer.zip)

  return this.http.put('http://admin.iphixx.com/api/v1/customers/agents/'+agent.agent_id,
    body.toString(), { headers : { 'Content-Type' : 'application/x-www-form-urlencoded' } ,params : {  } })
}

editOwner(owner) {
  console.log(owner);

  const body = new HttpParams()
   .set('owner_name', owner.owner_name)

   .set('email', owner.email)
   .set('phone', owner.phone)
   .set('location', owner.location)
   .set('birthdate', owner.birthdate)

  return this.http.put('http://admin.iphixx.com/api/v1/bookings/edit-owner/'+ owner.owner_id,
    body.toString(), { headers : { 'Content-Type' : 'application/x-www-form-urlencoded' } ,params : {  } })
}

 updateBookingStatus(id) {
   //this.sendMail(id);
   console.log('called ' + id);
   return this.http.put('http://admin.iphixx.com/api/v1/bookings/status/' + id , {responseType: 'text' as 'text'});
   //return this.http.put('http://admin.iphixx.com/api/v1/bookings/'+id , {});
 }

 updatePaymentStatus(id){
  //this.sendMail(id);
  console.log("called "+id);
  return this.http.put('http://admin.iphixx.com/api/v1/bookings/payment/'+id , {});
  //return this.http.put('http://admin.iphixx.com/api/v1/bookings/'+id , {});
}

 cancelBooking(id){
  return this.http.put('https://admin.iphixx.com/api/v1/bookings/cancel/'+id, {});
}

  getType(){
    switch(this.type){
      case 'All':
        this.router.navigate(['/notifications']);
        break;
      case 'Created':
        this.notif="Repair with Invoice No.10566 has been created on 2018-12-07 08:04:32";
        //location.reload();
        break;
      case 'Ongoing':
        this.notif= "Repair with Invoice No.10566 has been marked as resolved on 2018-12-10 11:21:20";
        //location.reload();
        break;
      case 'Resolved':
        this.notif= "Repair with Invoice No.10566 has been marked as resolved on 2018-12-10 11:21:20";
        location.reload();
        break;
      case 'Paid':
        this.notif="Repair with Invoice No.10566 has been marked as paid on 2018-12-11 03:04:24";
        location.reload();
        break;
      }
  }
  saveTax(tax) {
    localStorage.setItem('tax', tax);
  }
  // getTax() {
  //   return localStorage.getItem('tax');
  // }
  getAllModels() {
      { return this.http.get<any>('assets/json/models.json'); }
  }

  loginAgent(email,password){
    const body = new HttpParams()
   .set('email', email)
   .set('password',password)

    return this.http.post('http://admin.iphixx.com/api/v1/customers/sign-in',
      body.toString(), { headers : { 'Content-Type' : 'application/x-www-form-urlencoded' } ,params : {  } })
  }
}
