sap.ui.define([], ()=> {
    "use strict";
        return{
            formatRevenueClass: function(revenue){
                if(revenue > 0 && revenue <= 25000){
                    return "blue"
                }else if (revenue > 25000 && revenue <= 50000){
                    return "green"
                }else if(revenue > 50000 && revenue <= 75000){
                    return "yellow"
                }else{
                    return "red"
                }

            }
        }
});