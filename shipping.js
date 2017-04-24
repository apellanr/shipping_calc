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
    this.keyInput = [""];
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

    this.handleKeypress = function(evt) {
        let charCode = evt.charCode;
        console.log(charCode);
        this.validateKeypress();
        this.checkDecimals();
        this.truncateZeros();
    };

    // **** Keypress Validation **** //
    this.validateKeypress = function(event) {
        if(event.keyCode === 13) { //enables users to press the enter to submit to display shipment calc
            $("#submitButton").click(); // calls display shipping function once enter pressed
            // above line wasn't work with just this.submit.click(); need to ask why
        }
        if()
        return (event.which === 46 || event.which > 47 && event.which < 58);
    }.bind(this);

    this.checkDecimals = function(evt) {


        // if(this.decimal === false) {
        //     if(isNaN(this.keyInput[this.keyInput.length - 1])) {
        //         this.keyInput.push(".");
        //         this.decimal = true;
        //     } else {
        //         this.keyInput[this.keyInput.length - 1] += (".");
        //         this.decimal = true;
        //     }
        //     this.displayShipping();
        // }
    };

    this.truncateZeros = function() {

    };

    // **** Change Shipping Type **** //
    this.changeShippingType = function() {
        this.shippingTime = $('.radio:checked').val();
        console.log('shipping type changed to', this.shippingTime);
    };

    // **** function for date info **** //
    this.dateInformation = function(time) {
        let presentDay = new Date(); // should i set this up as a global variable or a local variable within dateInfo function?

        /*
         if current day is Sunday, add one day to the shipping (cannot send on Sunday)
         if it would arrive on Sunday, add one day to shipping
         i didn't think to pass in another new Date() into new Date() method
         i had a few peers walk me through this logic
         note: 86400000 milliseconds in a day
         */
        if(presentDay === 0) {
            presentDay = new Date(new Date().getTime() + (86400000));
        }
        if(presentDay !== 0) {
            presentDay = new Date(new Date().getTime() + (time * 86400000));
        }

        // created arrays for days of the week and calender months in order to retrieve values for indexes
        // note: originally I tried to add +1 to the getMonth() method but it was actually outputting a month behind
        // need to advice on why that was happening - 4/24/16
        let daysInWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let calenderMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let dayOfTheWeek = daysInWeek[presentDay.getDay()]; // returns the day of the week (0 - 6)
        let month = calenderMonths[presentDay.getMonth()]; // January is 0; returns the months (0 - 11)
        let dayOfTheMonth = presentDay.getDate(); // returns day of the month (1 - 31)
        let year = presentDay.getFullYear(); // returns year
        let fullDate = (dayOfTheWeek + ", " + month + " " + dayOfTheMonth + ", " + year);
        return fullDate;
    };

    // **** Calculate Shipping **** //
    this.calculateShipping = function(weight, time) {
        let cost;
        let shipmentObject = {
            "weightInPounds": weight + " pounds",
            "time": "Type: " + time + " day"
        };
        // adding to shipmentObj by dot notation
        let departingTime = this.dateInformation(0);
        shipmentObject.departing = "Departing: " + departingTime;
        let arrivingTime  = this.dateInformation(time);
        shipmentObject.arrival = "Arriving: " + arrivingTime;

        let weightInOunces = weight * 16;
        shipmentObject.weightInOunces = weightInOunces + " ounces";

        if (weightInOunces < 20) {
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

        shipmentObject.cost = "Cost: $" + cost.toFixed(2); // restricts 2 numbers following the decimal point
        return shipmentObject;
    };

    // **** Display Shipping **** //
    this.displayShipping = function() {
        let weight = $("#weightInput").val();
        if(weight === "") {
            return;
        }
        this.changeShippingType();
        let calculatedData = this.calculateShipping(weight, this.shippingTime);
        $("#oz").text(calculatedData.weightInOunces);
        $("#lbs").text(calculatedData.weightInPounds);
        $("#type").text(calculatedData.time);
        $("#departing").text(calculatedData.departing);
        $("#arriving").text(calculatedData.arrival);
        $("#cost").text(calculatedData.cost);
        $("#weightInput").val('');
    };

}