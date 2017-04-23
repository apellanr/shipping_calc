/* question about keypress - want to eliminate leading and trailing zeros
unncessary decimal issue with multiple keypress - should i set up multiple fxns after validate keypress? */

$(document).ready(createNewShipment);

let shipment = null;

function createNewShipment() {
    shipment = new ShipmentCalculation();
    shipment.init();
}

function ShipmentCalculation() {
    this.self = this;
    this.shippingTime = 5;
    this.keyInput = [];
    this.decimal = false;
    this.init = function() {
        this.textInput = $('#weightInput');
        this.radioButton = $('.radio');
        this.submit = $('#submitButton');
        this.applyEventHandlers();
    };

    // **** Event Handlers **** //
    this.applyEventHandlers = function() {
        // add a keydown handler to the text input that calls "validate_keypress"
        this.textInput.keypress(this.validateKeypress);
        // add a click handler to the radio buttons (all of them) that calls "change_shipping_type"
        this.radioButton.click(this.changeShippingType);
        // add a click handler to the button that calls "display_shipping"
        this.submit.click(this.displayShipping);
    };

    this.handleKeypress = function(value) {
        this.validateKeypress();
        this.checkDecimals();
        this.truncateZeros();
    };

    // **** Keypress Validation **** //
    this.validateKeypress = function(event) {
        if(event.keyCode === 13) { //enables users to press the enter to submit to display shipment calc
            this.displayShipping(); // calls display shipping function once enter pressed
        }
        return (event.which === 46 || event.which > 47 && event.which < 58);
    };

    this.checkDecimals = function() {

    };

    this.truncateZeros = function() {

    };

    // **** Change Shipping Type **** //
    this.changeShippingType = function() {
        this.shippingTime = $('.radio:checked').val();
        console.log('shipping type changed to', this.shippingTime);
    };

    // **** function for date info **** //
    this.dateInformation = function() {
        let today = new Date(); // should i set this up as a global variable or a local variable within dateInfo function?
        let daysInWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let calenderMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let dd = today.getDate(); // returns dat of the month (1 - 31)
        let mm = today.getMonth() + 1; // January is 0; returns the months (0 - 11)
        let yyyy = today.getFullYear(); // returns year
    };

    // **** Calculate Shipping **** //
    this.calculateShipping = function(weight, time) {
        let weightInOunces = weight * 16;
        let cost;

        if(weightInOunces < 20) {
            cost = weightInOunces * .02;
        } else if (weightInOunces > 32) {
            cost = weightInOunces * .20;
        } else {
            cost = weightInOunces * .10;
        }

        switch(time) {
            case 2:
                cost *= 2;
                break;
            case 3:
                cost *= 1.5;
                break;
            case 5:
            default:
                cost *= 1;
                break;
        }
        return cost.toFixed(2);
    };

    // **** Display Shipping **** //
    this.displayShipping = function() {

    };
}


// this.shipmentObj = { // return object with properties and values:
//     "arrival_date": this.deliveryTime, // 1) arrival date (string)
//     "weight": , // 2) weight (number) - the weight (in ounces) of the package
//     // 3) cost (number) - the cost (in dollars) of shipping
// };