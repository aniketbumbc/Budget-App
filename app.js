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
    var calculateTotal =function(type){
      var sum = 0;
        data.allItems[type].forEach(function(cur){
            sum += cur.value;
        });
        data.totals[type] = sum;
    };
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage:-1
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

            delteItem:function () {
            
            
            
            
             },








        calculateBudget: function () {
            //calculate  total income and exp
            calculateTotal('exp');
            calculateTotal('inc');
            // calculate budget  income - expe
            data.budget = data.totals.inc - data.totals.exp;
            // calculate percentage
            if(data.totals.inc > 0){
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }else{
                data.percentage = -1;
            }
        },
        getBudget: function () { 
            return{
                budget : data.budget,
                totalInc : data.totals.inc,
                totalExp : data.totals.exp,
                percentage : data.percentage
            };
         },
        testing: function () {
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
        expensesContainer: '.expenses__list',
        budgetLabel:  '.budget__value',
        bugetIncome:'.budget__income--value',
        budgetExpences:'.budget__expenses--value',
        percentageValue:'.budget__expenses--percentage',
        container:'.container'
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

        displayBudget:function(obj){
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.bugetIncome).textContent = obj.totalInc;
            document.querySelector(DOMstrings.budgetExpences).textContent = obj.totalExp;
                       
            if(obj.percentage > 0){
                document.querySelector(DOMstrings.percentageValue).textContent = obj.percentage + '%';  
            }else{
                document.querySelector(DOMstrings.percentageValue).textContent = '---';
            }           
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

        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);
    };

    var updateBudget = function () {
        //calculate budget
        budgetController.calculateBudget();
        // return budget
        var budget = budgetController.getBudget();
        //display budget
        UIctrl.displayBudget(budget);

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

    var ctrlDeleteItem= function(event){
        var itemID,splitID; 

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID){
            //inc-1
            splitId = itemID.spilt('-');
            type = splitID[0];
            ID = splitID[1];

            // detet from DS

            // delete from UI

            // Update form  budget
        }
    };
    return {
        init: function () {
            console.log("App started Here");
            setupEventListener();
            UIctrl.displayBudget({
                
                    budget : 0,
                    totalInc : 0,
                    totalExp : 0,
                    percentage :-1 
                
            });
        }
    }

})(budgetController, UIController);
controller.init();