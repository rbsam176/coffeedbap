// data = {"paymentMethods": [{"brands": ["mc", "visa"], "configuration": {"merchantId": "000000000200703", "merchantName": "CoffeeDBECOM"}, "details": [{"key": "applepay.token", "type": "applePayToken"}], "name": "Apple Pay", "type": "applepay"}]}
var jsonCall = $.getJSON("/api/getPaymentMethods",function(){
    var jsonData = JSON.parse(jsonCall.responseText);

    const configuration = {
        paymentMethodsResponse: jsonData,
        clientKey: "test_2GWNBLODVRBSLBBSJAZM2BVOUATCOSNH", // Web Drop-in versions before 3.10.1 use originKey instead of clientKey.
        locale: "en-GB",
        amount: {
            value: 799,
            currency: "GBP"
        },
        countryCode: "GB",
        environment: "test",
        onSubmit: (state, dropin) => {
            console.log(state)
            console.log('hi')
            console.log(dropin)
        },
        buttonType: 'plain',
    };
    const checkout = new AdyenCheckout(configuration);
    const dropin = checkout
        .create('dropin', {
            console.log('bye')
        })
        .mount('#dropin-container');
});







var indexFill = []

// APPENDS WHICH ICON INDEXES ARE FILLED
$("button.star-rating-btn").children('i').each(function(index) {
    if ($(this).hasClass('bi-star-fill')){
        indexFill.push(index)
    }
})

$("#reviewContent").keyup(function() {
    var limit = 150
    var currentCount = $("#reviewContent").val().length
    $("#characterCounter").text(limit - currentCount)
})

$( document ).ready(function() {
    // ON PAGE LOAD, ADJUST CHARACTER COUNT IF REVIEW PRE-EXISTS
    if ($("#reviewContent").val().length > 0){
        $("#characterCounter").text(150 - $("#reviewContent").val().length)
    }

    // GETS INDEX VALUE OF FIRST UNFILLED STAR
    var firstEmptyStar = indexFill.length

    // ADDS FILL ON ICONS BETWEEN PRE-FILLED AND CURRENTLY HOVERED ICON
    $( ".star-rating-btn" ).on("mouseover", function () {
        var hoverIndex = $(this).index()
        for (x = firstEmptyStar; x <= hoverIndex; x++) {
            $(".star-rating-btn").children('i').eq(x).removeClass('bi-star')
            $(".star-rating-btn").children('i').eq(x).addClass('bi-star-fill')
        }
    })
    // REMOVES FILL ON ICONS BETWEEN PRE-FILLED AND CURRENTLY HOVERED ICON
    $( ".star-rating-btn" ).on("mouseout", function () {
        var hoverIndex = $(this).index()
        for (x = firstEmptyStar; x <= hoverIndex; x++) {
            $(".star-rating-btn").children('i').eq(x).addClass('bi-star')
            $(".star-rating-btn").children('i').eq(x).removeClass('bi-star-fill')
        }
    })
})

