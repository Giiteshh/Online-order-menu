// This array will hold the items that the user adds to their cart
let cart = [];

// FUNCTION 1: Add items to the order / cart
function addToOrder(itemName, itemPrice) {
    // Check if the item is already in the cart
    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        // If it exists, just increase the quantity
        existingItem.quantity += 1;
    } else {
        // If it's a new item, push it to the cart array
        cart.push({
            name: itemName,
            price: itemPrice,
            quantity: 1
        });
    }

    // Refresh the screen display
    updateCartUI();
}

// FUNCTION 2: Update the Order Summary Display (UI)
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    // Clear out the previous display
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-message">Your cart is empty.</p>';
        cartTotalElement.innerText = '₹0';
        return;
    }

    let overallTotal = 0;

    // Loop through cart items and build the HTML rows dynamically
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        overallTotal += itemTotal;

        const row = document.createElement('div');
        row.className = 'cart-item-row';
        row.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>₹${itemTotal}</span>
        `;
        cartItemsContainer.appendChild(row);
    });

    // Update the total display text
    cartTotalElement.innerText = `₹${overallTotal}`;
}

// FUNCTION 3: Generate the Bill & Show Pop-up Modal
function generateBill() {
    if (cart.length === 0) {
        alert("Please add some tasty food to your cart first!");
        return;
    }

    const billModal = document.getElementById('bill-modal');
    const billDetails = document.getElementById('bill-details');
    
    // Calculate final calculations
    let subtotal = 0;
    let itemsText = '';
    
    cart.forEach(item => {
        const cost = item.price * item.quantity;
        subtotal += cost;
        itemsText += `${item.name.padEnd(25)} x${item.quantity}   ₹${cost}\n`;
    });

    const tax = Math.round(subtotal * 0.05); // 5% GST
    const deliveryFee = 40;
    const finalGrandTotal = subtotal + tax + deliveryFee;

    // Generate a clean text-based receipt format
    const receiptTemplate = `
-----------------------------------------
          BiteDash Express Receipt       
-----------------------------------------
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}
-----------------------------------------
Items:
${itemsText}
-----------------------------------------
Subtotal:                    ₹${subtotal}
GST (5%):                    ₹${tax}
Delivery Fee:                ₹${deliveryFee}
-----------------------------------------
GRAND TOTAL:                 ₹${finalGrandTotal}
-----------------------------------------
    Thank you for ordering with us!      
     Your food is on the way! 🎉        
-----------------------------------------
    `;

    // Inject text into the modal container and display the pop-up
    billDetails.textContent = receiptTemplate;
    billModal.style.display = 'flex';
}

// FUNCTIONS 4 & 5: Close the invoice window
function closeModal() {
    document.getElementById('bill-modal').style.display = 'none';
    
    // Optional: Clear the cart after a successful order placement
    cart = [];
    updateCartUI();
}

// Close the window if the user clicks anywhere outside of the receipt paper
window.onclick = function(event) {
    const modal = document.getElementById('bill-modal');
    if (event.target == modal) {
        closeModal();
    }
}
