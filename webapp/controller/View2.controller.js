sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller,JSONModel) => {
    "use strict";
    var that;
    return Controller.extend("sbpmart.controller.View2", {
        onInit() {
            that = this;
            var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
            oRouter.getRoute('View2').attachPatternMatched(that.empMethod,that);
            var oModel = that.getOwnerComponent().getModel();
            if(!that.dialog2){
                that.dialog2 = sap.ui.xmlfragment("sbpmart.fragments.createEmp", that);
            }
        },
        empMethod:function(oEvent){
            // if (!that.) {
            //     this.getOwnerComponent().getRouter().navTo("RouteView1");
            //     return;
            // }
            var oData = oEvent.getParameter("arguments");
            var plantLoc = oData.plantLocation;
            var EMP_BRANCH = new sap.ui.model.json.JSONModel({
                EMP_BRANCH : plantLoc
            })
            that.getView().setModel(EMP_BRANCH,"textModel");
            that.filterEmpByLoc(plantLoc);
            
        },
        filterEmpByLoc:function(plantLoc){
            that.getOwnerComponent().getModel().read("/EMPLOYEE",{
                success:function(response){
                    var filteredEmployees = response.results.filter(employee=> employee.EMP_BRANCH === plantLoc);
                    console.log(filteredEmployees);
                    
                    var oModel = new sap.ui.model.json.JSONModel({
                        items : filteredEmployees
                    })
                    that.byId("empList").setModel(oModel);
                    sap.m.MessageToast.show("Displaying Employee List");
                },error:function(error){
                    sap.m.MessageToast.show("Error");
                    console.log(error);
                }
            })
        },
        backNav: function(){
            that.getOwnerComponent().getRouter().navTo("RouteView1");
        },
        addEmployee: function(){
            that.dialog2.open();
        },
        onSubmit:function(){
            let oNewEmployee = {
                EMP_ID : sap.ui.getCore().byId("e_id").getValue(),
                EMP_NAME : sap.ui.getCore().byId("e_name").getValue(),
                EMP_BLODD_GRP : sap.ui.getCore().byId("e_bloodgrp").getValue(),
                EMP_DESIG : sap.ui.getCore().byId("e_des").getValue(),
                EMP_EMAIL : sap.ui.getCore().byId("e_email").getValue(),
                EMP_CONT : sap.ui.getCore().byId("e_contact").getValue(),
                EMP_ADDRESS : sap.ui.getCore().byId("e_address").getValue(),
                EMP_BRANCH : sap.ui.getCore().byId("e_branch").getValue(),
            }
            
            var oData = that.getOwnerComponent().getModel();
            oData.create("/EMPLOYEE", oNewEmployee, {
                success: function (response) {
                    sap.m.MessageToast.show("Employee Data added successfully");
                    oData.push(oNewEmployee);
                    oData.refresh();
                    }.bind(that),
                error: function (error) {
                    console.log(error)
                }
        })
            
            that.dialog2.close();
            that.onReset();
        },
        onClose: function(){
            that.dialog2.close();
        },
        onReset: function(){
            sap.ui.getCore().byId("e_id").setValue("");
            sap.ui.getCore().byId("e_name").setValue("");
            sap.ui.getCore().byId("e_bloodgrp").setValue("");
            sap.ui.getCore().byId("e_des").setValue("");
            sap.ui.getCore().byId("e_email").setValue("");
            sap.ui.getCore().byId("e_contact").setValue("");
            sap.ui.getCore().byId("e_address").setValue("");
            sap.ui.getCore().byId("e_branch").setValue("");
        }
    });
});