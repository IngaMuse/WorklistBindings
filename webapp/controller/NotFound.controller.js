sap.ui.define([
		"zjblessons/WorklistBindings/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("zjblessons.WorklistBindings.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);