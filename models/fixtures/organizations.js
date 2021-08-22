import {fixture} from "can";
import Organization from "../organization";


export function mockOrganizationsService(){
	console.log("called");
	var terms = ["fast","quick","super","great","insta","wonder","amaze","awesome","neat"],
		subjects = ["dog","laundry","diapers","clothes","car","windows","carpet","taxes","food","gas","trash"],
		types = ["CO","LLC","Partners"];

	var dayInMS = 24*60*60*1000;
	var lastWeek = new Date() - (7*dayInMS);
	var fourWeeks = new Date().getTime() + (4*7*dayInMS);

	var organizationStore = fixture.store(100, function(){
		return {
			isDestination: fixture.rand([true, false],1)[0],
			isOrigin: fixture.rand([true, false],1)[0],
			name: (fixture.rand(terms,1)[0]+" "+fixture.rand(subjects,1)[0]+" "+fixture.rand(types,1)[0]).trim(),
			createdAt: new Date( fixture.rand(lastWeek, fourWeeks) ).toString(),
		}
	}, Organization);

	fixture("/api/organizations/{id}", organizationStore);
	fixture.delay = 100;
}
