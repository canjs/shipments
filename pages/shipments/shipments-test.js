import mocha from "steal-mocha";
import chai from 'chai';

import PageShipments from "./shipments";
import {fixture} from "can";
import {makeRandomShipment} from "~/models/fixtures/shipments";

describe('pages/shipments shows a loading screen, then data', (a) => {
	it('shows a loading screen and then the shipment name', function() {
		let shipmentsPage;

		const randomShipment = makeRandomShipment();

		fixture("GET /api/shipments", function(req){
			// This will never resolve
			chai.assert( shipmentsPage.element.querySelector(".pending"), "showing pending element" );
			return {data: [randomShipment]};
		});

		shipmentsPage = new PageShipments();

		return shipmentsPage.viewModel.shipmentsPromise.then(()=> {
			chai.assert(
				shipmentsPage.element.querySelector(".shipment-name").textContent ===
				randomShipment.name, "shows text of shipment" );
		});

	});
});
