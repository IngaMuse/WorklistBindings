/*global QUnit*/

jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"zjblessons/WorklistBindings/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"zjblessons/WorklistBindings/test/integration/pages/Worklist",
	"zjblessons/WorklistBindings/test/integration/pages/Object",
	"zjblessons/WorklistBindings/test/integration/pages/NotFound",
	"zjblessons/WorklistBindings/test/integration/pages/Browser",
	"zjblessons/WorklistBindings/test/integration/pages/App"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "zjblessons.WorklistBindings.view."
	});

	sap.ui.require([
		"zjblessons/WorklistBindings/test/integration/WorklistJourney",
		"zjblessons/WorklistBindings/test/integration/ObjectJourney",
		"zjblessons/WorklistBindings/test/integration/NavigationJourney",
		"zjblessons/WorklistBindings/test/integration/NotFoundJourney"
	], function () {
		QUnit.start();
	});
});