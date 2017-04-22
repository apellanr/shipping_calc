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
    this.currentInput = [];
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

    // **** Keypress Validation **** //
    this.validateKeypress = function(event) {
        if(event.keyCode === 13) { //enables users to press the enter to submit to display shipment calc
            this.displayShipping(); // calls display shipping function once enter pressed
        }
        return (event.which === 46 || event.which > 47 && event.which < 58);
    };

    // **** Change Shipping Type **** //
    this.changeShippingType = function() {
        this.shippingTime = $('.radio:checked').val();
        console.log('shipping type changed to', this.shippingTime);
    };

    // **** Calculate Shipping **** //
    this.calculateShipping = function(weight, shipping_time) {


        // object required to return

    };

    // **** Display Shipping **** //
    this.displayShipping = function() {

    };
}
