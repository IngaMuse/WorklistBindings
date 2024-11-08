sap.ui.define(
  [
    "zjblessons/WorklistBindings/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "zjblessons/WorklistBindings/model/formatter",
    "sap/ui/model/Sorter",
  ],
  function (
    BaseController,
    JSONModel,
    formatter,
    Sorter,
  ) {
    "use strict";

    return BaseController.extend("zjblessons.WorklistBinding.controller.WorklistBindings", {
      formatter: formatter,

      onInit: function () {
        const oViewModel = new JSONModel({
          sCount: "0",
          busy: false,
          busyIndicatorDelay: 0,
        });
        this.setModel(oViewModel, "worklistView");
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
        this.getView()
          .getModel()
          .read("/zjblessons_base_Headers/$count", {
            success: (sCount) => {
              this.getModel("worklistView").setProperty("/sCount", sCount);
            },
          });
      },

      _getTableTemplate() {
        const oTemplate = new sap.m.ColumnListItem({
          highlight: "{= ${Version} === 'A' ? 'Success' : 'Error'}",
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
      }

    });
  }
);