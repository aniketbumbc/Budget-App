

var budgetController = (function() {

})();





var  UIController =(function(){

})();






//app controller
var controller =(function(budgetCtrl, UIctrl){

    var ctrlAddItem = function(){
        // get filed input data

       //add the item to the budget controller

       //add the item to the UI

       //calculate budget

       //display budget

       alert("Hello Aniket");

    }

    document.querySelector('.add__btn').addEventListener('click',ctrlAddItem);

    document.addEventListener('keypress',function(event){
       if(event.keyCode === 13 || event.which === 13){
        ctrlAddItem();
       }           
    });


})(budgetController,UIController); 









