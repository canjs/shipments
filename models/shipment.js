import {realtimeRestModel, DefineMap, DefineList, fixture} from "can";
import Organization from "./organization";

const OrgHydateType = {
	type: function(value){
		return Organization.connection.hydrateInstance(value);
	},
	serialize: false
};
window.Organization = Organization;

const Shipment = DefineMap.extend("Shipment",{
	id: {type: "number", identiy: true},
	name: "string",
	destinationOrganizationId: "number",
	originOrganizationId: "number",
	departureDate:"date",
	arrivalDate:  "date",
	destinationOrganization: OrgHydateType,
	originOrganization: OrgHydateType,
});

Shipment.List = DefineList.extend("ShipmentList",{
	"#": Shipment
});

const baseConnection = realtimeRestModel({
	Map: Shipment,
	List: Shipment.List,
	url: "/api/shipments/{id}"
});

Shipment.connection = baseConnection

export default Shipment;
