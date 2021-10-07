import {fixture} from "can";
import Shipment from "../shipment";
import {mockOrganizationsService} from "~/models/fixtures/organizations";

export function makeRandomShipment(orgsThatCanShip){
	if(!orgsThatCanShip) {
		const organizationsStore = mockOrganizationsService();
		const organizationsConnection = organizationsStore.connection;
		orgsThatCanShip = organizationsConnection.getListDataSync({
			filter: {isDestination: true, isOrigin: true}
		}).data;
	}

	var items = ["paper","plastic","steel","sand","lithium","tungsten","wood","copper"];
	var methods = ["boat","car","airplane","bike","dogsled","ufo","aws spacecraft","ice cream truck"];

	var dayInMS = 24*60*60*1000;
	var lastWeek = new Date() - (7*dayInMS);
	var fourWeeks = new Date().getTime() + (4*7*dayInMS);

	const orgs = fixture.rand(orgsThatCanShip,2);
	const name = `${fixture.rand(items,1)[0]} by ${ fixture.rand(methods,1)[0]}`
	const departureDate = new Date( fixture.rand(lastWeek, fourWeeks) );
	return {
		name: name,
		destinationOrganizationId: orgs[1].id,
		originOrganizationId: orgs[0].id,
		departureDate: departureDate.toString(),
		arrivalDate: new Date( departureDate.getTime() + fixture.rand(dayInMS* 20) ).toString(),
	}
}


export function mockShipmentsService(){
	const organizationsStore = mockOrganizationsService();
	const organizationsConnection = organizationsStore.connection;

	const {data: orgsThatCanShip} = organizationsConnection.getListDataSync({
		filter: {isDestination: true, isOrigin: true}
	});

	var shipmentsStore = fixture.store(100, function(){
		return makeRandomShipment(orgsThatCanShip);
	}, Shipment);


	fixture("/api/shipments/{id}", shipmentsStore);
	fixture("GET /api/shipments", function(request){
		const data = {...request.data};
		const include = data.include || [];
		delete data.include;

		const response = shipmentsStore.connection.getListDataSync(data);

		response.data.forEach( (shipment)=> {
			if(include.includes("destinationOrganization")) {
				shipment.destinationOrganization = organizationsConnection.getRecord(shipment.destinationOrganizationId)
			}
			if(include.includes("originOrganization")) {
				shipment.originOrganization = organizationsConnection.getRecord(shipment.originOrganizationId)
			}
		})
		return response;
	});

	fixture.delay = 5000;
	return shipmentsStore;
}
