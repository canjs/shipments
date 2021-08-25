import {realtimeRestModel, DefineMap, DefineList, fixture} from "can";

const Organization = DefineMap.extend("Organization",{
	id: { type: "number", identity: true },
	isDestination: { type: "boolean", default: false },
	isOrigin: { type: "boolean", default: false },
	name: "string",
	createdAt: {type: "date", Default: Date}
});

Organization.List = DefineList.extend("OrganizationList",{
	"#": Organization
});

Organization.connection = realtimeRestModel({
	Map: Organization,
	List: Organization.List,
	url: "/api/organizations/{id}"
});

export default Organization;
