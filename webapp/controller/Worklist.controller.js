sap.ui.define(
  [
    "zjblessons/WorklistBindings/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "zjblessons/WorklistBindings/model/formatter",
    "sap/ui/model/Sorter",
  ],
  function (BaseController, JSONModel, formatter, Sorter) {
    "use strict";

    return BaseController.extend(
      "zjblessons.WorklistBinding.controller.WorklistBindings",
      {
        formatter: formatter,

        onInit: function () {
          const oViewModel = new JSONModel({
            sCount: "0",
            busy: false,
            busyIndicatorDelay: 0,
          });
          this.setModel(oViewModel, "worklistView");
          this._bGrouped = false;
        },

        onBeforeRendering: function () {
          this._bindTable();
        },

        _bindTable() {
          const oTable = this.getView().byId("table");
          oTable.bindItems({
            path: "/zjblessons_base_Headers",
            sorter: [new Sorter("DocumentDate", true)],
            template: this._getTableTemplate(),
            urlParameters: {
              $select:
                "HeaderID,DocumentNumber,DocumentDate,PlantText,RegionText,Description,Created",
            },
            events: {
              dataRequested: (oData) => {
                this._getTableCounter();
              },
            },
          });
        },

        _getTableCounter() {
          const oTable = this.getView().byId("table");
          const oBinding = oTable.getBinding("items");
          oBinding.attachChange(function () {
            const sCount = oBinding.getLength();
            this.getModel("worklistView").setProperty("/sCount", sCount);
          }, this);
        },

        _getTableTemplate() {
          const oTemplate = new sap.m.ColumnListItem({
            highlight: "{= ${RegionText} ? 'Success' : 'Error'}",
            type: "Navigation",
            cells: [
              new sap.m.Text({
                text: "{DocumentNumber}",
              }),
              new sap.m.Text({
                text: {
                  path: "DocumentDate",
                  type: "sap.ui.model.type.Date",
                  formatOptions: { style: "short" },
                },
              }),
              new sap.m.Text({
                text: "{PlantText}",
              }),
              new sap.m.Text({
                text: "{RegionText}",
              }),
              new sap.m.Text({
                text: "{Description}",
              }),
              new sap.m.Text({
                text: {
                  path: "Created",
                  type: "sap.ui.model.type.Date",
                  formatOptions: { style: "short" },
                },
              }),
            ],
          });
          return oTemplate;
        },

        onSelectionChange: function () {
          const oTable = this.byId("table"),
            aSelectedItems = oTable.getSelectedItems(),
            oInput = this.byId("changeDescriptionID");
          oInput.setEnabled(aSelectedItems.length > 0);
        },

        onChangeDescription: function (oEvent) {
          const oTable = this.byId("table"),
            oItem = oTable.getSelectedItems()[0],
            oContext = oItem.getBindingContext(),
            sValue = oEvent.getParameter("value");
          oContext.getModel().setProperty("Description", sValue, oContext);
          oContext.getModel().refresh(true);
        },
        onToggleGrouping: function () {
          this._bGrouped = !this._bGrouped;
          const oTable = this.byId("table"),
            oBinding = oTable.getBinding("items");
          let aSorters = [];
          if (this._bGrouped) {
            aSorters.push(new Sorter("RegionText", false, true));
          }
          const oCurrentSorter = oTable.getBinding("items").aSorters;
          if (oCurrentSorter && oCurrentSorter.length > 0) {
            for (let i = 0; i < oCurrentSorter.length; i++) {
              if (oCurrentSorter[i].sPath !== "RegionText") {
                aSorters.push(oCurrentSorter[i]);
              }
            }
          }
          oBinding.sort(aSorters);
        },
      }
    );
  }
);