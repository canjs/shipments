import {fixture} from "can";
import Shipment from "../shipment";
import {mockOrganizationsService} from "~/models/fixtures/organizations";

export function mockShipmentsService(){
	var shipmentsStore = fixture.store(100, function(){
		return { };
	}, Shipment);



	fixture("/api/shipments/{id}", shipmentsStore);
	fixture("GET /api/shipments", function(request){

	});

	fixture.delay = 100;
	return shipmentsStore;
}
