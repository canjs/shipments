import {realtimeRestModel, DefineMap, DefineList, fixture} from "can";
import Organization from "./organization";

const OrgHydateType = {
	type: function(value){
		return Organization.connection.hydrateInstance(value)
	},
	serialize: false
};
window.Organization = Organization;

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

const baseConnection = realtimeRestModel({
	Map: Shipment,
	List: Shipment.List,
	url: "/api/shipments/{id}"
});
const oldUpdatedInstance = baseConnection.updatedInstance;
baseConnection.updatedInstance = function(instance, data){
	const result = oldUpdatedInstance.call(this, instance, data);
	if(instance.destinationOrganization) {
		instance.destinationOrganization =
			Organization.connection.instanceStore.get(instance.destinationOrganizationId);
	}
	if(instance.originOrganization) {
		instance.originOrganization =
			Organization.connection.instanceStore.get(instance.originOrganizationId);
	}
	return result;
}

Shipment.connection = baseConnection

export default Shipment;
