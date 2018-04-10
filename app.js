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

    return {
        addItem: function (type, des, val) {
            var newItem, ID;

            //create new ID 

            if (data.allItems[type].lenght > 0) {
                ID = data.allItems[type][data.allItems[type].lenght - 1].id + 1;
            } else {
                ID = 0;
            }

            // create new item based on inc and exp
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            //push to DS
            data.allItems[type].push(newItem);

            //return new element
            return newItem;
        },


        getData: function () {
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
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    };

    return {
        getinput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // either inc or expen
                discription: document.querySelector(DOMstrings.inputDiscription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function (obj, type) {
            var html, newHtml, element;
            // create HTML string place holder

            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div> </div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            //replace placeholder text with actual data

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //insert html into dom

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        //clear fields which enter

        clearFields: function () {
            var fields, filedsArr;
            fields = document.querySelectorAll(DOMstrings.inputDiscription + ',' + DOMstrings.inputValue);

            filedsArr = Array.prototype.slice.call(fields);

            filedsArr.forEach(function (current, index, array) {
                current.value = "";
            });

            filedsArr[0].focus();

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

    var updateBudget = function () {
        //calculate budget


        // return budget


        //display budget



    };










    var ctrlAddItem = function () {

        var input, newItem;

        // get filed input data

        input = UIctrl.getinput();

        if (input.discription !== "" && !isNaN(input.value) && input.value > 0) {
            //add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.discription, input.value);

            //add the item to the UI
            UIctrl.addListItem(newItem, input.type);

            //clear fields
            UIctrl.clearFields();
        }
        //calculate and update budget 

        updateBudget();
    };

    return {
        init: function () {
            console.log("App started Here");
            setupEventListener();
        }
    }

})(budgetController, UIController);

controller.init();