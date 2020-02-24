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

export interface Devices {
  devices: Array<any>;
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
  location_id: any;
}

export interface Device {
  devicemodel_id: any;
  model_name: any;
  model_number: any;
  screenrep_price: any;
  headrep_price: any;
  earrep_price: any;
  powerrep_price: any;
  rearcamrep_price: any;
  frontcamrep_price: any;
  homerep_price: any;
  microphone_price: any;
  chargeport_price: any;
  volumerep_price: any;
  battrep_price: any;
  signalrep_price: any;
  backglass_price: any;
  trackpad_price: any;
  hdmirep_price: any;
  harddrive_rep: any;
  devtype_id: any;
  devicebrand_id: any;
}

export interface LaptopPrice {
  LaptopPriceNo: any;
  laptopscreenrep_price: any;
  laptopchargerep_price: any;
  keyboardrep_price: any;
  fanrep_price: any;
  laptopcamrep_price: any;
  laptopspeakerrep_price: any;
  laptopbatteryrep_price: any;
  datarecovery: any;
  virusremoval_withsoftware: any;
  HDDHalfTeraWithDataTransfer: any;
  HDDTeraWithDataTransfer: any;
  HDDHalfTera: any;
  HDDTera: any;
  SSDHalfTeraWithDataTransfer: any;
  SSDTeraWithDataTransfer: any;
  SSDHalfTera: any;
  SSDTera: any;
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

  devicespages: any;
  devicesPage  = new Object();
  devicespageActive: number;
  devicesAction: string;

  invoicespages: any;
  invoicesPage  = new Object();
  invoicePageActive: number;

  ticketPages: any;
  ticketsPage  = new Object();
  ticketPageActive: number;

  inventoryPages: any;
  inventoryPage  = new Object();
  inventoryPageActive: number;

  invoiceDetails:any;

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
    devices: [],
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

  getDevices(page = 1) {
    return this.http.get<Devices>('https://admin.iphixx.com/api/v1/bookings/all-devices/?page=' + page);
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

  getInvoice(id) {
    return this.http.get<Customer>('https://admin.iphixx.com/api/v1/bookings/invoice/' + id);
  }

  getTicket(id) {
    return this.http.get<Customer>('https://admin.iphixx.com/api/v1/bookings/ticket/' + id);
  }

  getDevice(id) {
    return this.http.get<Device>('https://admin.iphixx.com/api/v1/bookings/device/' + id);
  }

  getLaptopPrice() {
    return this.http.get<LaptopPrice>('https://admin.iphixx.com/api/v1/bookings/laptop-prices');
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
    .set('firstName', customer.customer_fname)
    .set('lastName', customer.customer_lname)
    .set('email', customer.email)
    .set('mobile', customer.phone)
    .set('address', customer.address)
    .set('birthdate', customer.birthdate)
    .set('location_id', customer.location_id)
    .set('smsOption',customer.smsOption);
    return this.http.post('https://admin.iphixx.com/api/v1/customers/',
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
   .set('location_id', customer.location_id)
   .set('birthdate', customer.birthdate)
   .set('smsOption',customer.smsOption);
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

updatePrice(prices) {
  console.log(prices);
  var body = new HttpParams()
  if (prices.screenrep_price!= null)
    body = body.append('screenrep_price', prices.screenrep_price);
  if (prices.headrep_price!= null)
    body = body.append('headrep_price', prices.headrep_price)
  if (prices.earrep_price!= null)
    body = body.append('earrep_price', prices.earrep_price)
  if (prices.powerrep_price!= null)
    body = body.append('powerrep_price', prices.powerrep_price)
  if (prices.rearcamrep_price!= null)
    body = body.append('rearcamrep_price', prices.rearcamrep_price)
  if (prices.frontcamrep_price!= null)
    body = body.append('frontcamrep_price',prices.frontcamrep_price)
  if (prices.homerep_price!= null)
    body = body.append('homerep_price',prices.homerep_price)
  if (prices.microphone_price!= null)
    body = body.append('microphone_price',prices.microphone_price)
  if (prices.chargeport_price!= null)
    body = body.append('chargeport_price',prices.chargeport_price)
  if (prices.volumerep_price!= null)
    body = body.append('volumerep_price',prices.volumerep_price)
  if (prices.battrep_price!= null)
    body = body.append('battrep_price',prices.battrep_price)
  if (prices.signalrep_price!= null)
    body = body.append('signalrep_price',prices.signalrep_price)
  if (prices.backglass_price!= null)
    body = body.append('backglass_price',prices.backglass_price)

  console.log(body.toString);
  return this.http.put('http://admin.iphixx.com/api/v1/bookings/edit-price/'+prices.devicemodel_id,body.toString,
    { headers : { 'Content-Type' : 'application/x-www-form-urlencoded' } ,params : {} })
}

updateLaptopPrice(prices) {
  console.log(prices);
  const body = new HttpParams()
   .set('laptopscreenrep_price', prices.laptopscreenrep_price)
   .set('headrep_price', prices.headrep_price)
   .set('earrep_price', prices.earrep_price)
   .set('powerrep_price', prices.powerrep_price)
   .set('rearcamrep_price', prices.rearcamrep_price)
   .set('frontcamrep_price',prices.frontcamrep_price)
   .set('homerep_price',prices.homerep_price)
   .set('microphone_price',prices.microphone_price)
   .set('chargeport_price',prices.chargeport_price)
   .set('volumerep_price',prices.volumerep_price)
   .set('battrep_price',prices.battrep_price)
   .set('signalrep_price',prices.signalrep_price)
   .set('backglass_price',prices.backglass_price)

  return this.http.put('http://admin.iphixx.com/api/v1/customers/edit-laptop-price/'+prices.devicemodel_id,
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

transferLead(id){
  return this.http.put('https://admin.iphixx.com/api/v1/bookings/transfer-lead/'+id, {});
}

updateTicketStatus(id) {
   return this.http.put('http://admin.iphixx.com/api/v1/bookings/update-ticket-status/' + id , {});
}

updateRepairStatus(id) {
  return this.http.put('http://admin.iphixx.com/api/v1/bookings/update-repair-status/' + id , {});
}

updateInvoiceStatus(id){
  return this.http.put('http://admin.iphixx.com/api/v1/bookings/payment/'+id , {});
}

startRepair(id){
  return this.http.put('http://admin.iphixx.com/api/v1/bookings/start-repair/'+id , {});
}

leadLost(id){
  return this.http.put('https://admin.iphixx.com/api/v1/bookings/lead-lost/'+id, {});
}

cancelTicket(id){
  return this.http.put('https://admin.iphixx.com/api/v1/bookings/cancel-ticket/'+id, {});
}

checkLeadStatus(id){
  return this.http.get('https://admin.iphixx.com/api/v1/bookings/check-lead-status/'+id, {});
}

checkRepairStatus(id){
  return this.http.get('https://admin.iphixx.com/api/v1/bookings/check-repair-status/'+id, {});
}

checkInvoiceStatus(id){
  return this.http.get('https://admin.iphixx.com/api/v1/bookings/check-invoice-status/'+id, {});
}

checkTicketStatus(id){
  return this.http.get('https://admin.iphixx.com/api/v1/bookings/check-ticket-status/'+id, {});
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
