sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sbpmart/model/formatter"
], (Controller,formatter) => {
    "use strict";
    var that;
    return Controller.extend("sbpmart.controller.View1", {
         formatter : formatter,
        onInit() {
            that=this;
            var oModel=that.getOwnerComponent().getModel();
            that.getView().getModel(oModel);

            if(!that.dialog1){
                that.dialog1 = sap.ui.xmlfragment("sbpmart.fragments.createPlant", that);
            }  
        },
        onAddPlant: function(){
            that.dialog1.open();
        },
        onCreatePlant: function(){
            let oPlant = {
                PLANT_ID :sap.ui.getCore().byId("p_id").getValue(),
                PLANT_NAME :sap.ui.getCore().byId("p_name").getValue(),
                PLANT_LOC :sap.ui.getCore().byId("p_loc").getValue(),
                PLANT_AVATAR :sap.ui.getCore().byId("p_avatar").getValue(),
                PLANT_CONT: sap.ui.getCore().byId("p_cont").getValue(),
                PLANT_EMAIL :sap.ui.getCore().byId("p_email").getValue(),
                PLANT_HEAD :sap.ui.getCore().byId("p_head").getValue(),
                PLANT_REVENUE :sap.ui.getCore().byId("p_rev").getValue(),
                PLANT_CUST_COUNT :sap.ui.getCore().byId("p_count").getValue(),
            }
            that.getOwnerComponent().getModel().create("/PLANTS",oPlant,{
                success:function(response){
                    sap.m.MessageToast.show("Plant Details added successfully");
                },error:function(error){
                    sap.m.MessageToast.show("Error while adding Plant");
                    console.log(error);
                }
            })
            that.onRefresh();
            that.dialog1.close();
        },
        onRefresh: function(){
            sap.ui.getCore().byId("p_id").setValue("");
            sap.ui.getCore().byId("p_name").setValue("");
            sap.ui.getCore().byId("p_loc").setValue("");
            sap.ui.getCore().byId("p_avatar").setValue("");
            sap.ui.getCore().byId("p_cont").setValue("");
            sap.ui.getCore().byId("p_email").setValue("");
            sap.ui.getCore().byId("p_head").setValue("");
            sap.ui.getCore().byId("p_rev").setValue("");
            sap.ui.getCore().byId("p_count").setValue("");
        },
        onCancelPlant: function()  {
            that.dialog1.close();
        },
        onEmployeeList: function(oEvent){
            var oPlant = oEvent.getSource().getBindingContext().getProperty("PLANT_LOC");
            that.getOwnerComponent().getRouter().navTo("View2",{
                plantLocation : oPlant
            });
        },
        // getRevenueStyleClass: function (revenue) {
        //     if (revenue > 0 && revenue <= 25000) {
        //         return "blueBg";  // Return the class name for this range
        //     } else if (revenue > 25000 && revenue <= 50000) {
        //         return "greenBg";  // Return the class name for this range
        //     } else if (revenue > 50000 && revenue <= 75000) {
        //         return "yellowBg";  // Return the class name for this range
        //     } else {
        //         return "redBg";  // Return the class name for this range
        //     }
        // }

    });
});