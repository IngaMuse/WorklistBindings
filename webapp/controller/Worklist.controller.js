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

          this.getOwnerComponent()
            .getModel()
            .read("/zjblessons_base_Headers", {
              success: this.onDataLoadSuccess.bind(this),
              error: this.onDataLoadError.bind(this),
            });
        },

        onDataLoadSuccess: function (oData) {
          const oJsonModel = new JSONModel(oData.results);
          const aData = oJsonModel.getData();
          aData.forEach((item, index) => {
            item.Order = index + 1;
          });
          oJsonModel.setData({ aData });
          this.getView().setModel(oJsonModel, "jsonModel");
          this._getTableCounter();
        },

        onDataLoadError: function (oError) {
          console.error("Ошибка загрузки данных: ", oError);
        },

        onBeforeRendering: function () {
          this._bindTable();
        },

        _bindTable() {
          const oTable = this.getView().byId("table");
          oTable.bindItems({
            path: "jsonModel>/aData",
            template: this._getTableTemplate(),
            urlParameters: {
              $select:
                "HeaderID,DocumentNumber,DocumentDate,PlantText,RegionText,Description,Created,Order",
            },
            events: {
              dataRequested: (oData) => {
                this._getTableCounter();
              },
            },
          });
        },

        _getTableCounter() {
          const sCount = this.getView().getModel("jsonModel").getData().aData.length;
          this.getModel("worklistView").setProperty("/sCount", sCount);
        },

        _getTableTemplate() {
          const oTemplate = new sap.m.ColumnListItem({
            highlight: "{= ${jsonModel>RegionText} ? 'Success' : 'Error'}",
            type: "Navigation",
            cells: [
              new sap.m.Text({
                text: "{jsonModel>DocumentNumber}",
              }),
              new sap.m.Text({
                text: {
                  path: "jsonModel>DocumentDate",
                  type: "sap.ui.model.type.Date",
                  formatOptions: { style: "short" },
                },
              }),
              new sap.m.Text({
                text: "{jsonModel>PlantText}",
              }),
              new sap.m.Text({
                text: "{jsonModel>RegionText}",
              }),
              new sap.m.Text({
                text: "{jsonModel>Description}",
              }),
              new sap.m.Text({
                text: {
                  path: "jsonModel>Created",
                  type: "sap.ui.model.type.Date",
                  formatOptions: { style: "short" },
                },
              }),
              new sap.m.Text({
                text: "{jsonModel>Order}",
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
            oItem = oTable.getSelectedItem(),
            oContext = oItem.getBindingContext("jsonModel"),
            sValue = oEvent.getParameter("value");
          oContext.getModel("jsonModel").setProperty("Description", sValue, oContext);
          oContext.getModel("jsonModel").refresh(true);
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

        onDropSelectedProductsTable: function () {},
      }
    );
  }
);
