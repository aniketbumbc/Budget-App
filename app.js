var budgetController = (function () {

    //function constructor 

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }; 

    return{
        addItem:function(type,des,val){
            var newItem ,ID;

            //create new ID 

            if(data.allItems[type].lenght>0){
                ID = data.allItems[type][data.allItems[type].lenght - 1].id + 1;
            }else{
                ID = 0;
            }

           


            // create new item based on inc and exp
            if(type === 'exp'){                
           newItem = new Expense(ID, des, val);
            }else if (type === 'inc'){
                newItem = new Income(ID, des, val);
            }
            
            //push to DS
            data.allItems[type].push(newItem);

            //return new element
            return newItem;
        },

      
            getData:function(){
                console.log(data);
            }
        
    };

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

        var input, newItem;

        // get filed input data

         input = UIctrl.getinput();

        //add the item to the budget controller

         newItem = budgetCtrl.addItem(input.type, input.discription, input.value);

        //add the item to the UI

        //calculate budget

        //display budget
    };

    return {
        init: function () {
            console.log("App started Here");
            setupEventListener();
        }
    }

})(budgetController, UIController);

controller.init();