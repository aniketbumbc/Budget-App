var budgetController = (function() {
// x and add inner method and variable. They are execute and end scope IIFE
    var x =23 ;
    var add = function(a){
        return x + a ;
    }
    // publicTest function is public and clourse works here. It inner function which has outer function scope and 
    // and variable which is x and add. so cloure and IIFE works here
        return{
            publicTest:function(b){
                console.log(add(b));
            }
        }
})();