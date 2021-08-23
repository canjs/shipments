import {realtimeRestModel, DefineMap, DefineList, fixture} from "can";
import Organization from "./organization";

const OrgHydateType = {
	type: function(value){
		return Organization.connection.hydrateInstance(value)
	}
};

const Shipment = DefineMap.extend("Shipment",{
	id: { type: "number", identity: true },
	name: "string",
	destinationOrganizationId: {type: "string"},
	destinationOrganization: OrgHydateType,
	originOrganizationId: {type: "string"},
	originOrganization: OrgHydateType,
	departureDate: {type: "date"},
	arrivalDate: {type: "date"}
});

Shipment.List = DefineList.extend("ShipmentList",{
	"#": Shipment
});

const ShipmentConnection = realtimeRestModel({
	Map: Shipment,
	List: Shipment.List,
	url: "/api/shipments/{id}"
});

export default Shipment;
