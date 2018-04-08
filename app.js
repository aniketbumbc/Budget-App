

var budgetController = (function() {

})();





var  UIController =(function(){

})();






//app controller
var controller =(function(budgetCtrl, UIctrl){

    document.querySelector('.add__btn').addEventListener('click',function(){
       // get filed input data

       //add the item to the budget controller

       //add the item to the UI

       //calculate budget

       //display budget
    });

    document.addEventListener('keypress',function(event){
       if(event.keyCode === 13 || event.which === 13){
        console.log("Enter Press");
       }
           
    });


})(budgetController,UIController); 









