var budgetController = (function () {

})();





var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDiscription: '.add__description',
        inputValue: '.add__value',
        inputAddBtn: '.add__btn',
    };

    return {
        getinput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // either inc or expen
                discription: document.querySelector(DOMstrings.inputDiscription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDOMstrings: function () {
            return DOMstrings;
        }
    };

})();






//app controller

var controller = (function (budgetCtrl, UIctrl) {

    var setupEventListener = function () {
        var DOM = UIctrl.getDOMstrings();

        document.querySelector(DOM.inputAddBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };


   
    var ctrlAddItem = function () {
        // get filed input data

        var input = UIctrl.getinput();

        //add the item to the budget controller

        //add the item to the UI

        //calculate budget

        //display budget
    };

    return {
        init: function(){
            console.log("App started Here");
             setupEventListener();             
        }
    }

})(budgetController, UIController);

controller.init();