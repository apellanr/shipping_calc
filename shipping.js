$(document).ready(createNewShipment);

let shipment = null;

function createNewShipment() {
    shipment = new ShipmentCalculation();
    shipment.init();
}

function ShipmentCalculation() {
    this.shippingTime = null;

    this.init = function() {
        this.applyEventHandlers();
    };
    // **** Event Handlers **** //
    this.applyEventHandlers = function() {
        // add a keydown handler to the text input that calls "validate_keypress"
        $('#weightInput').keypress(this.validateKeypress);
        // add a click handler to the radio buttons (all of them) that calls "change_shipping_type"
        $('input[type=radio]').click(this.changeShippingType);
        // add a click handler to the button that calls "display_shipping"
        $()
    };
    // **** Validate Keypress **** //
    this.validateKeypress = function() {

    };

    // **** Change Shipping Type **** //
    this.changeShippingType = function() {

    };

    // **** Calculate Shipping **** //
    this.calculateShipping = function() {

    };

    // **** Display Shipping **** //
    this.displayShipping = function() {

    };
}