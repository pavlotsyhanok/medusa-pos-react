import { loadStripeTerminal } from '@stripe/terminal-js';

export async function initializeTerminal() {
    const StripeTerminal = await loadStripeTerminal();
    const terminal = StripeTerminal.create({
        onFetchConnectionToken: fetchConnectionToken,
        onUnexpectedReaderDisconnect: unexpectedDisconnect,
    });
    return terminal;
}

function unexpectedDisconnect() {
    // In this function, your app should notify the user that the reader disconnected.
    // You can also include a way to attempt to reconnect to a reader.
    console.log("Disconnected from reader")
}

function fetchConnectionToken() {
    const baseURL = document.querySelector("#base-url")?.dataset.baseUrl;
    console.log(baseURL + '/store/terminal/connection-token')
    // Do not cache or hardcode the ConnectionToken. The SDK manages the ConnectionToken's lifecycle.
    return fetch(baseURL + '/store/terminal/connection-token', { method: "POST" })
          .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            console.log(data)
            return data.connection_token.secret;
          });
}

// Handler for a "Discover readers" button
export function discoverReaderHandler(terminal) {
    var config = {
       simulated: true // Control Simaulated Mode
    };
    return terminal.discoverReaders(config).then(function(discoverResult) {
        if (discoverResult.error) {
        console.log('Failed to discover: ', discoverResult.error);
        } else if (discoverResult.discoveredReaders.length === 0) {
            console.log('No available readers.');
        } else {
            return discoverResult.discoveredReaders;
        }
    });
}

// Handler for a "Connect Reader" button
export function connectReaderHandler(terminal, selectedReader) {
    return terminal.connectReader(selectedReader).then(function(connectResult) {
        if (connectResult.error) {
            const message = 'Failed to connect: ' + connectResult.error
            console.log(message);
            return {
                connected:false,
                message:message
            };
        } else {
            const message = 'Connected to reader: ' + connectResult.reader.label
            console.log(message);
            return {
                connected:true,
                message:message
            };
        }
    });
}

function fetchPaymentIntentClientSecret(amount) {
    const baseURL = document.querySelector("#base-url")?.dataset.baseUrl;
    const bodyContent = JSON.stringify({ amount: amount });
    return fetch(baseURL + '/store/terminal/create-payment-intent', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: bodyContent
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        return data.client_secret;
    });
}

export async function collectPayment(terminal, amount) {
    const client_secret = await fetchPaymentIntentClientSecret(amount)
    terminal.setSimulatorConfiguration({testCardNumber: '4242424242424242'}); // This card goes through
    // terminal.setSimulatorConfiguration({testCardNumber: '4000000000009995'}); // This card declines
    const paymentCollectionResult = await terminal.collectPaymentMethod(client_secret);
    if (paymentCollectionResult.error) {
        // Placeholder for handling result.error
        console.error(paymentCollectionResult.error);
    } else {
        const paymentProcessingResult = await terminal.processPayment(paymentCollectionResult.paymentIntent)
        if (paymentProcessingResult.error) {
            console.error(paymentProcessingResult.error);
            return {
                error:true,
                response:paymentProcessingResult.error
            };
        } else if (paymentProcessingResult.paymentIntent) {
            console.log(paymentProcessingResult.paymentIntent)
            return {
                error:false,
                response:paymentProcessingResult.paymentIntent
            };
        }
    }
}

// That's the function for capturing payments if the need arises

// function capture(paymentIntentId) {
//     const baseURL = document.querySelector("#base-url")?.dataset.baseUrl;
//     return fetch('baseURL + '/store/terminal/capture-payment-intent', {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({"payment_intent_id": paymentIntentId})
//     })
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {

//     });
// }