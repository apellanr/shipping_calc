/*
question about keypress - want to eliminate leading and trailing zeros
unncessary decimal issue with multiple keypress - should i set up multiple fxns after validate keypress?

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

    // **** Calculate Shipping **** //
    this.calculateShipping = function(weight, time) {
        this.ounces = weight * 16;
        this.cost = 0;

        if(this.ounces < 20) {
            this.cost = this.ounces * .02;
        } else if (this.ounces > 32) {
            this.cost = this.ounces * .20;
        } else {
            this.cost = this.ounces * .10;
        }

        switch(time) {
            case 5:
                this.cost *= 1;
                break;
            case 3:
                this.cost *= 1.5;
                break;
            case 2:
                this.cost *= 2;
                break;
        }


        this.shipmentObj = { // return object with properties and values:
            "arrival_date": this.deliveryTime, // 1) arrival date (string)
            "weight": this.ounces, // 2) weight (number) - the weight (in ounces) of the package
            "cost": this.costOfPackage // 3) cost (number) - the cost (in dollars) of shipping
        };
        return this.shipmentObj;
    };

    // **** Display Shipping **** //
    this.displayShipping = function() {

    };
}
