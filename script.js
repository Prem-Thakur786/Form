// Your Web App URL from Google Apps Script deployment
const apiUrl = "https://script.google.com/macros/s/AKfycbxJ5QaO5B_zU-aOkCJH4309oVI-mrKHxh8Ox_RIeDm3Tmx14_RyhcOCV-xqwa4P7LHu/exec";

// Submit order function
async function submitOrder() {
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const totalPrice = document.getElementById("totalPrice").value;

    // Validate the form
    if (!fullName || !email || !phone || !address) {
        alert("Please fill out all fields.");
        return;
    }

    const orderData = {
        fullName,
        email,
        phone,
        address,
        totalPrice,
    };

    try {
        // Send data to Google Apps Script API
        const response = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(orderData),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        // Handle success
        if (response.ok && result.status === "Success") {
            document.getElementById("responseMessage").classList.remove("hidden");
            document.getElementById("responseMessage").innerHTML = `
                <h1>Order Confirmed!</h1>
                <p>Thank you for your order, ${fullName}.</p>
                <p>Total: $${totalPrice}</p>
            `;
            // Hide the checkout form
            document.getElementById("checkoutForm").classList.add("hidden");
        } else {
            throw new Error(result.message || "Unknown error");
        }
    } catch (error) {
        alert("There was an error submitting the order. " + error.message);
    }
}

// Attach event listener to submit button
document.getElementById("submitButton").addEventListener("click", submitOrder);
