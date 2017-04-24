/* question about keypress - want to eliminate leading and trailing zeros
unncessary decimal issue with multiple keypress - should i set up multiple fxns after validate keypress? */
/*
FOR REFERENCE
one_day = 1000 * 60 * 60 * 24; one_hour = 1000 * 60 * 60; one_minute = 1000 + 60; one_second = 1000
- variables used to multiply to get days/hours/minutes/seconds/out of the amount of milliseconds
- (1 second = 1000 milliseconds)
 */

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
        this.submit.click(this.displayShipping.bind(this));
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
        // note: 86400000 milliseconds in a day
        let presentDay = new Date(); // should i set this up as a global variable or a local variable within dateInfo function?
        let daysInWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let calenderMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let dayOfTheWeek = daysInWeek[presentDay.getDay()]; // returns the day of the week (0 - 6)
        let month = calenderMonths[presentDay.getMonth() + 1]; // January is 0; returns the months (0 - 11)
        let dayOfTheMonth = presentDay.getDate(); // returns day of the month (1 - 31)
        let year = presentDay.getFullYear(); // returns year
        let fullDate = (dayOfTheWeek + ", " + month + " " + dayOfTheMonth + ", " + year);
        console.log(fullDate);
        return fullDate;
    };

    // **** Calculate Shipping **** //
    this.calculateShipping = function(weight, time) {
        let cost;
        shipmentObj = {
            "weightInPounds": weight + " pounds",
            "time": "Type: " + time + " day"
        };
        // adding to shipmentObj by dot notation
        let departingTime = this.dateInformation(0);
        shipmentObj.departing = "Departing: " + departingTime;
        let arrivingTime  = this.dateInformation(time);
        shipmentObj.arrival = "Arriving: " + arrivingTime;

        let weightInOunces = weight * 16;
        shipmentObj.weightInOunces = weightInOunces + " ounces";

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

        shipmentObj.cost = "Cost: $" + cost.toFixed(2); // restricts 2 numbers following the decimal point
        return shipmentObj;
    };

    // **** Display Shipping **** //
    this.displayShipping = function() {
        let weight = $("#weightInput").val();
        this.changeShippingType();
        let calculatedData = this.calculateShipping(weight, this.shippingTime);
        $("#oz").text(calculatedData.weightInOunces);
        $("#lbs").text(calculatedData.weightInPounds);
        $("#type").text(calculatedData.time);
        $("#departing").text(calculatedData.departing);
        $("#arriving").text(calculatedData.arrival);
        $("#cost").text(calculatedData.cost);
    };
}