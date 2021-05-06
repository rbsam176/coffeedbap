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
        buttonType: 'plain',
        onSubmit: (state, component) => {
            console.log(state);

            if (state.isValid) {
                handleSubmission(state, component, "/api/initiatePayment");
            }
        },
    };
        // onSubmit: (state, dropin) => {
        //     // Global configuration for onSubmit
        //     // Your function calling your server to make the `/payments` request
        //     makePayment(state.data)
        //     .then(response => {
        //         if (response.action) {
        //         // Drop-in handles the action object from the /payments response
        //         dropin.handleAction(response.action);
        //         } else {
        //         // Your function to show the final result to the shopper
        //         showFinalResult(response);
        //         }
        //     })
        //     .catch(error => {
        //         throw Error(error);
        //     });
        // },
        // onAdditionalDetails: (state, dropin) => {
        // // Your function calling your server to make a `/payments/details` request
        // makeDetailsCall(state.data)
        //     .then(response => {
        //     if (response.action) {
        //         // Drop-in handles the action object from the /payments response
        //         dropin.handleAction(response.action);
        //     } else {
        //         // Your function to show the final result to the shopper
        //         showFinalResult(response);
        //     }
        //     })
        //     .catch(error => {
        //     throw Error(error);
        //     });
        // },
        // paymentMethodsConfiguration: {
        // card: { // Example optional configuration for Cards
        //     hasHolderName: true,
        //     holderNameRequired: true,
        //     enableStoreDetails: true,
        //     hideCVC: false, // Change this to true to hide the CVC field for stored cards
        //     name: 'Credit or debit card',
        //     onSubmit: () => {}, // onSubmit configuration for card payments. Overrides the global configuration.
        // }
        // }
    // };
    const checkout = new AdyenCheckout(configuration);
    const dropin = checkout
        .create('dropin', {
            paymentMethodsConfiguration: {
            // Required configuration for Apple Pay
            applepay: {
                onSubmit: (state) => {
                // Call your server to make `/payments` request
                makePayment(state.data)
                    .then(response => {
                    // Your function to show the final result to the shopper
                    showFinalResult(response);
                    })
                    .catch(error => {
                    throw Error(error);
                    });
                }
            }
            },
        })
        .mount('#dropin-container');
});


// EXPERIMENT

async function handleSubmission(state, component, url) {
	try {
		const res = await callServer(url, state.data);
		handleServerResponse(res, component);
	} catch (error) {
		console.error(error);
		alert("Error occurred. Look at console for details");
	}
}

// Calls your server endpoints
async function callServer(url, data) {
	const res = await fetch(url, {
		method: "POST",
		body: data ? JSON.stringify(data) : "",
		headers: {
			"Content-Type": "application/json"
		}
	});

	return await res.json();
}

// Handles responses sent from your server to the client
function handleServerResponse(res, component) {
	if (res.action) {
		component.handleAction(res.action);
	} else {
		switch (res.resultCode) {
			case "Authorised":
				window.location.href = "/result/success";
				break;
			case "Pending":
			case "Received":
				window.location.href = "/result/pending";
				break;
			case "Refused":
				window.location.href = "/result/failed";
				break;
			default:
				window.location.href = "/result/error";
				break;
		}
	}
}





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

