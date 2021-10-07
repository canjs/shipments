import { Component, type } from "can";
import shipmentsStache from "./shipments.stache";
import Shipment from "~/models/shipment";
import ShipmentEdit from "~/components/shipment-edit/";
import BitModal from "~/components/bit-modal/";
import Organization from "~/models/organization";

const formater = new Intl.DateTimeFormat('default', {
	year: 'numeric', month: 'numeric', day: 'numeric',
	hour: 'numeric', minute: 'numeric', second: 'numeric'
});

const PageShipments = Component.extend({
	tag: "page-shipments",
	view: shipmentsStache,
	ViewModel: {
		sort: "string",
		originOrganizationId: "string",

		// this is needed for filtering
		shipmentsPromise: {
			get(){
				var query = {filter: { }, include: ["destinationOrganization","originOrganization"]};
				if(this.sort) {
					query.sort =  this.sort;
				}
				if(this.originOrganizationId) {
					query.filter.originOrganizationId = parseInt( this.originOrganizationId, 10);
				}
				return Shipment.getList(query);
			}
		},
		get organizationsPromise(){
			return Organization.findAll();
		},
		organizations: {
			get(lastSetValue, resolve){
				this.organizationsPromise.then(resolve)
			}
		},
		get originOrganizationsPromise(){
			return this.organizationsPromise.then( (organizations)=> {
				return organizations.filter( org => org.isOrigin )
			})
		},
		formatDate(date) {
			return formater.format(date);
		},
		_editingShipment: type.maybe(Shipment),
		isEditing(org){
			return org === this._editingShipment;
		},
		edit(shipment){
			this._editingShipment = shipment;
		},
		cancelEdit(){
			this._editingShipment = null;
		},
		get editShipmentComponent(){
			if(this._editingShipment) {
				return new ShipmentEdit({
					viewModel: {
						shipment: this._editingShipment,
						organizations: this.organizations,
						onSaved: this.cancelEdit.bind(this),
						onCancelled: this.cancelEdit.bind(this)
					}
				})
			}
		},
		connectedCallback(){
			this.listenTo("editShipmentComponent", ({value, oldValue})=> {
				if(oldValue) {
					BitModal.remove(oldValue);
				}
				if(value) {
					BitModal.add(value);
				}
			});
		}
	}
});

export default PageShipments;
