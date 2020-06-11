import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse , HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

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

export interface Locations {
  locations : Array<any>;
  total_page : any;
  page: any;
}

export interface Agents {
  agents: Array<any>;
  total_page: any;
  page: any;
}

export interface Networks {
  networks: Array<any>;
  total_page: any;
  page: any;
}

export interface Devtypes {
  devtypes: Array<any>;
  total_page: any;
  page: any;
}

export interface Devices {
  devices: Array<any>;
  total_page: any;
  page: any;
}

export interface Brands {
  brands: Array<any>;
  total_page: any;
  page: any;
}

export interface Invoices {
  invoices: Array<any>;
  total_page: any;
  page: any;
}

export interface Logistics {
  logistics: Array<any>;
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

export interface Locations {
	locations: Array<any>;
  total_page: any;
  page: any;
}

export interface LocationList {
	location_id: any;
  location_name: any;
}

export interface DevtypeList {
	devtype_id: any;
  type: any;
}

export interface BrandList {
	devicebrand_id: any;
  device_brand: any;
}

export interface Customer {
  customer_fname: any;
  customer_lname: any;
  email: any;
  birthdate: any;
  phone: any;
  location_id: any;
}

export interface Invoice {
  customer_fname: any;
  customer_lname: any;
  email: any;
  birthdate: any;
  phone: any;
  location_id: any;
}

export interface Location {
  location_id: any;
  location_name: any;
  company_name: any;
  location_address:any;
  main_contact: any;
}

export interface Logistic {
  bookings_id: any;
  customer_fname: any;
  customer_lname: any;
  location_id: any;
  device_brand: any;
  model_name: any;
  customer_id: any;
  created_at: any;
  transfer_timestamp: any;
  lost_timestamp: any;
  ticket_no: any;
  ticket_create: any;
  outbound_timestamp: any;
  ongoing_timestamp: any;
  inbound_timestamp: any;
  resolved_timestamp: any;
  cancelled_timestamp: any;
}

export interface Stock {
  quantity:any;
}

export interface Brand {
  devicebrand_id: any;
  device_brand: any;
}

export interface Network {
  carrier_no: any;
  carrier_name: any;
}

export interface Devtype {
  devtype_id: any;
  type: any;
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

export interface Agent {
  agent_fname: any,
	agent_lname :any,
	agent_username:any,
  	email : any,
  	phone : any,
  	address :any,
  	location_id : any,
  	// state : '',
  	// zip : '',
  	id : 0,
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

  locationspages: any;
  locationsPage  = new Object();
  locationspageActive: number;
  locationsAction: string;

  devtypespages: any;
  devtypesPage  = new Object();
  devtypespageActive: number;
  devtypesAction: string;

  brandspages: any;
  brandsPage  = new Object();
  brandspageActive: number;
  brandsAction: string;

  devicespages: any;
  devicesPage  = new Object();
  devicespageActive: number;
  devicesAction: string;

  networkspages: any;
  networksPage  = new Object();
  networkspageActive: number;
  networksAction: string;

  invoicespages: any;
  invoicesPage  = new Object();
  invoicePageActive: number;

  ticketPages: any;
  ticketsPage  = new Object();
  ticketPageActive: number;

  inventoryPages: any;
  inventoryPage  = new Object();
  inventoryPageActive: number;

  logisticPages: any;
  logisticsPage  = new Object();
  logisticPageActive: number;

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
    devtypes: [],
    brands: [],
    devices: [],
    networks: [],
    logistics: [],
    locations:[]
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
    return this.http.get<Agents>('https://admin.iphixx.com/api/v1/bookings/agents/?page=' + page);
  }

  getDevtypes(page = 1) {
    return this.http.get<Devtypes>('https://admin.iphixx.com/api/v1/bookings/devtypes/?page=' + page);
  }

  getDevices(page = 1) {
    return this.http.get<Devices>('https://admin.iphixx.com/api/v1/bookings/all-devices/?page=' + page);
  }

  getBrands(page = 1) {
    return this.http.get<Brands>('https://admin.iphixx.com/api/v1/bookings/brands/?page=' + page);
  }

  getNetworks(page = 1) {
    return this.http.get<Networks>('https://admin.iphixx.com/api/v1/bookings/networks/?page=' + page);
  }

  getInvoices(page =  1) {
    return this.http.get<Invoices>('https://admin.iphixx.com/api/v1/bookings/invoices/?page=' + page);
  }

  getLocations(page =  1) {
    return this.http.get<Locations>('https://admin.iphixx.com/api/v1/bookings/locations/?page=' + page);
  }

  getTickets(page =  1) {
    return this.http.get<Tickets>('https://admin.iphixx.com/api/v1/bookings/tickets/?page=' + page);
  }

  getLogistics(page =  1) {
    return this.http.get<Logistics>('https://admin.iphixx.com/api/v1/bookings/logistics/?page=' + page);
  }

  getLocationList() {
    return this.http.get<LocationList>('https://admin.iphixx.com/api/v1/bookings/list-locations');
  }

  getBrandList() {
    return this.http.get<BrandList>('https://admin.iphixx.com/api/v1/bookings/list-brands');
  }

  getDevtypeList() {
    return this.http.get<DevtypeList>('https://admin.iphixx.com/api/v1/bookings/list-devtypes');
  }

  getInventory(page =  1) {
  	return this.http.get<Inventory>('https://admin.iphixx.com/api/v1/bookings/inventory/?page=' + page);
  }

  getOwner(id) {
    return this.http.get<Customer>('https://admin.iphixx.com/api/v1/bookings/owner/' + id);
  }

  getInvoice(id) {
    return this.http.get<Invoice>('https://admin.iphixx.com/api/v1/bookings/invoice/' + id);
  }

  getLocation(id) {
    return this.http.get<Location>('https://admin.iphixx.com/api/v1/bookings/invoice/' + id);
  }

  getLogistic(id) {
    return this.http.get<Logistic>('https://admin.iphixx.com/api/v1/bookings/logistic/' + id);
  }

  getAgent(id) {
    return this.http.get<Agent>('https://admin.iphixx.com/api/v1/bookings/agent/' + id);
  }

  getStock(id){
    return this.http.get<Stock>('https://admin.iphixx.com/api/v1/bookings/stock/' + id);
  }

  getTicket(id) {
    return this.http.get<Customer>('https://admin.iphixx.com/api/v1/bookings/ticket/' + id);
  }

  getDevtype(id) {
    return this.http.get<Devtype>('https://admin.iphixx.com/api/v1/bookings/devtype/' + id);
  }

  getDevice(id) {
    return this.http.get<Device>('https://admin.iphixx.com/api/v1/bookings/device/' + id);
  }

  getBrand(id) {
    return this.http.get<Brand>('https://admin.iphixx.com/api/v1/bookings/brand/' + id);
  }

  getLaptopPrice() {
    return this.http.get<LaptopPrice>('https://admin.iphixx.com/api/v1/bookings/laptop-prices');
  }

  getNetwork(id) {
    return this.http.get<Network>('https://admin.iphixx.com/api/v1/bookings/network/' + id);
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

uploadDevtypeImage(image) {
  const body = new FormData()
  .append('image', image);

  return this.http.post('https://admin.iphixx.com/api/v1/bookings/upload-devtype-image/', body)
}

uploadModelImage(image) {
  const body = new HttpParams()
  .set('image', image);

  return this.http.post('https://admin.iphixx.com/api/v1/bookings/upload-model-image/', 
  body.toString(), { headers : { 'Content-Type' : 'application/x-www-form-urlencoded' } ,params : {  } })
}

uploadBrandImage(image,brand_name): Observable<any>{
  console.log(image);
  let body = new FormData()
  body.append('image', image);
  body.append('device_brand',brand_name)

  console.log(body);
  return this.http.post('https://admin.iphixx.com/api/v1/bookings/upload-brand-image/', body)
}

uploadNetworkImage(image) {
  const body = new HttpParams()
  .set('image', image);

  return this.http.post('https://admin.iphixx.com/api/v1/bookings/upload-network-image/', 
  body.toString(), { headers : { 'Content-Type' : 'application/x-www-form-urlencoded' } ,params : {  } })
}

addModel(model) {
  const body = new HttpParams()
  .set('devicebrand_id', model.devicebrand_id)
  .set('model_number', model.model_number)
  .set('model_name', model.model_name)
  .set('devtype_id', model.devtype_id)
  .set('screenrep_price', model.screenrep_price)
  .set('headrep_price', model.headrep_price)
  .set('earrep_price', model.earrep_price)
  .set('powerrep_price', model.powerrep_price)
  .set('rearcamrep_price', model.rearcamrep_price)
  .set('frontcamrep_price', model.frontcamrep_price)
  .set('homerep_price', model.homerep_price)
  .set('microphone_price', model.microphone_price)
  .set('chargeport_price', model.chargeport_price)
  .set('volumerep_price', model.volumerep_price)
  .set('battrep_price', model.battrep_price)
  .set('signalrep_price', model.signalrep_price)
  .set('backglass_price', model.backglass_price)
  .set('trackpad_price', model.trackpad_price)
  .set('hdmirep_price', model.hdmirep_price)
  .set('harddrive_rep', model.harddrive_rep);

  return this.http.post('https://admin.iphixx.com/api/v1/bookings/add-model/', 
    body.toString(), { headers : { 'Content-Type' : 'application/x-www-form-urlencoded' } ,params : {  } })
}

addDevtype(devtype) {
  const body = new HttpParams()
  .set('devtype_name', devtype.devtype_name);

  return this.http.post('https://admin.iphixx.com/api/v1/bookings/add-devtype/', 
    body.toString(), { headers : { 'Content-Type' : 'application/x-www-form-urlencoded' } ,params : {  } })
}

addBrand(brand) {
  const body = new HttpParams()
  .set('brand_name', brand.brand_name);

  return this.http.post('https://admin.iphixx.com/api/v1/bookings/add-brand/', 
    body.toString(), { headers : { 'Content-Type' : 'application/x-www-form-urlencoded' } ,params : {  } })
}

addNetwork(network) {
  const body = new HttpParams()
  .set('network_name', network.network_name);

  return this.http.post('https://admin.iphixx.com/api/v1/bookings/add-network/', 
    body.toString(), { headers : { 'Content-Type' : 'application/x-www-form-urlencoded' } ,params : {  } })
}

addRepairOption(repair) {
  const body = new HttpParams()
  .set('repairName', repair.repairName)
  .set('image', repair.image)
  return this.http.post('https://admin.iphixx.com/api/v1/bookings/add-repair-option/', 
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
   .set('address', agent.address)
   .set('location_id', agent.location_id)

   return this.http.post('http://admin.iphixx.com/api/v1/bookings/add-agent',
    body.toString(), { headers : { 'Content-Type' : 'application/x-www-form-urlencoded' } ,params : {  } })
}

addLocation(agent) {
  console.log(agent);
  const body = new HttpParams()
   .set('agent_fname', agent.agent_fname)
   .set('agent_lname', agent.agent_lname)
   .set('agent_username', agent.agent_username)
   .set('email', agent.email)
   .set('password', agent.password)
   .set('phone', agent.phone)
   .set('address', agent.address)

   return this.http.post('http://admin.iphixx.com/api/v1/bookings/add-agent',
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

 deleteBrand(id) {
  console.log(id);
  return this.http.delete('http://admin.iphixx.com/api/v1/bookings/brand/'+id);
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
   .set('location_id','1')
  return this.http.put('http://admin.iphixx.com/api/v1/bookings/update-agent/'+agent.agent_id,
    body.toString(), { headers : { 'Content-Type' : 'application/x-www-form-urlencoded' } ,params : {  } })
}

updateStock(stock) {
  console.log(stock);
  const body = new HttpParams()
   .set('quantity', stock.quantity)
   console.log(body.toString());
  return this.http.put('http://admin.iphixx.com/api/v1/bookings/update-stock/'+ stock.item_no,
    body.toString(), { headers : { 'Content-Type' : 'application/x-www-form-urlencoded' } ,params : {  } })
}

updateDevtype(devtype) {
  console.log(devtype);
  const body = new HttpParams()
   .set('type', devtype.type)
  return this.http.put('http://admin.iphixx.com/api/v1/bookings/update-devtype/'+devtype.devtype_id,
    body.toString(), { headers : { 'Content-Type' : 'application/x-www-form-urlencoded' } ,params : {  } })
}

updateBrand(brand) {
  console.log(brand);
  const body = new HttpParams()
   .set('device_brand', brand.device_brand)
  return this.http.put('http://admin.iphixx.com/api/v1/bookings/update-brand/'+brand.devicebrand_id,
    body.toString(), { headers : { 'Content-Type' : 'application/x-www-form-urlencoded' } ,params : {  } })
}

updateNetwork(network) {
  console.log(network);
  const body = new HttpParams()
   .set('carrier_name', network.carrier_name)
  return this.http.put('http://admin.iphixx.com/api/v1/bookings/update-network/'+network.carrier_no,
    body.toString(), { headers : { 'Content-Type' : 'application/x-www-form-urlencoded' } ,params : {  } })
}

updateDevice(model) {
  console.log(model);
  const body = new HttpParams()
  .set('devicemodel_id', model.devicemodel_id)
  .set('devicebrand_id', model.devicebrand_id)
  .set('model_number', model.model_number)
  .set('model_name', model.model_name)
  .set('devtype_id', model.devtype_id)
  return this.http.put('http://admin.iphixx.com/api/v1/bookings/update-device/'+model.devicemodel_id,
    body.toString(), { headers : { 'Content-Type' : 'application/x-www-form-urlencoded' } ,params : {  } })
}

updatePrice(prices) {
  console.log(prices);
  const body = new HttpParams()
   .set('screenrep_price', prices.screenrep_price)
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
   .set('trackpad_price',prices.trackpad_price)
   .set('hdmirep_price',prices.hdmirep_price)
   .set('harddrive_rep',prices.harddrive_rep)

   console.log(body.toString());
  return this.http.put('http://admin.iphixx.com/api/v1/bookings/edit-price/'+prices.devicemodel_id,
    body.toString(), { headers : { 'Content-Type' : 'application/x-www-form-urlencoded' } ,params : {  } })
}

updateLaptopPrice(prices) {
  console.log(prices);
  const body = new HttpParams()
   .set('laptopscreenrep_price', prices.laptopscreenrep_price)
   .set('laptopchargerep_price', prices.laptopchargerep_price)
   .set('keyboardrep_price', prices.keyboardrep_price)
   .set('fanrep_price', prices.fanrep_price)
   .set('laptopcamrep_price', prices.laptopcamrep_price)
   .set('laptopspeakerrep_price',prices.laptopspeakerrep_price)
   .set('laptopbatteryrep_price',prices.laptopbatteryrep_price)
   .set('datarecovery',prices.datarecovery)
   .set('virusremoval_withsoftware',prices.virusremoval_withsoftware)
   .set('HDDHalfTeraWithDataTransfer',prices.HDDHalfTeraWithDataTransfer)
   .set('HDDTeraWithDataTransfer',prices.HDDTeraWithDataTransfer)
   .set('HDDHalfTera',prices.HDDHalfTera)
   .set('HDDTera',prices.HDDTera)
   .set('SSDHalfTeraWithDataTransfer',prices.SSDHalfTeraWithDataTransfer)
   .set('SSDTeraWithDataTransfer',prices.SSDTeraWithDataTransfer)
   .set('SSDHalfTera',prices.SSDHalfTera)
   .set('SSDTera',prices.SSDTera)

  return this.http.put('http://admin.iphixx.com/api/v1/bookings/edit-laptop-price/',
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

deactivateAgent(agentId) {
  return this.http.put('https://admin.iphixx.com/api/v1/bookings/deactivate-agent/'+ agentId,{});
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
