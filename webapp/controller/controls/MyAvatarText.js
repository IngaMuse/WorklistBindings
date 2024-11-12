sap.ui.define(
  ["sap/m/HBox", "sap/m/Avatar", "sap/m/Text", "sap/ui/core/HTML"],
  function (HBox, Avatar, Text) {
    "use strict";

    return HBox.extend("zjblessons.WorklistBindings.controller.controls.MyAvatarText", {
      apiVersion: 2,
      metadata: {
        properties: {
          avatarSrc: { type: "string", defaultValue: "" },
          avatarDisplaySize: { type: "string", defaultValue: "Medium" },
          avatarDisplayShape: { type: "string", defaultValue: "Circle" },

          text: { type: "string", defaultValue: "" },
          textWidth: { type: "string", defaultValue: "auto" },
          textAlign: { type: "string", defaultValue: "left" }
        },
      },

      init: function () {
        HBox.prototype.init.apply(this, arguments);
        this._oAvatar = new Avatar();
        this._oText = new Text();

        this.addItem(this._oAvatar);
        this.addItem(this._oText);
      },

      setAvatarSrc: function (sSrc) {
        this.setProperty("avatarSrc", sSrc, true);
        this._oAvatar.setSrc(sSrc);
        return this;
      },

      setAvatarDisplaySize: function (sDisplaySize) {
        this.setProperty("avatarDisplaySize", sDisplaySize, true);
        this._oAvatar.setDisplaySize(sDisplaySize);
        return this;
      },
      setAvatarDisplayShape: function (sDisplayShape) {
        this.setProperty("avatarDisplayShape", sDisplayShape, true);
        this._oAvatar.setDisplayShape(sDisplayShape);
        return this;
      },

      setText: function (sText) {
        this.setProperty("text", sText, true);
        this._oText.setText(sText);
        return this;
      },

      setTextWidth: function (sWidth) {
        this.setProperty("textWidth", sWidth, true);
        this._oText.setWidth(sWidth);
        return this;
      },

      setTextAlign: function (sAlign) {
        this.setProperty("textAlign", sAlign, true);
        this._oText.setTextAlign(sAlign);
        return this;
      },

      exit: function () {
        this._oAvatar.destroy();
        this._oText.destroy();
        HBox.prototype.exit.apply(this, arguments);
      },
      renderer: "sap/m/HBoxRenderer"
    });
  }
);
