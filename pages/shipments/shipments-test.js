import "steal-mocha";
import chai from "chai";

import PageShipments from "./shipments";

import {fixture} from "can";
import {makeRandomShipment} from "~/models/fixtures/shipments";


describe("pages/shipments", ()=> {
	it("tests pending state then loaded state", ()=> {
		const randomShipment = makeRandomShipment();

		fixture("GET /api/shipments", function() {
			return {data: [randomShipment]}
		});

		let shipmentsPage = new PageShipments();

		chai.assert( shipmentsPage.element.querySelector(".pending"), "pending element present" );


		return shipmentsPage.viewModel.shipmentsPromise.then(()=> {
				chai.assert.equal(
					shipmentsPage.element.querySelector(".shipment-name").textContent,
					randomShipment.name,
					"showing the loaded shipment's name"
				);
		})
	})
})
