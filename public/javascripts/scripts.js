// script.js

// Add a script for handling form visibility
function toggleFormVisibility(addBook) {
    const form = document.getElementById(addBook);
    form.style.display = form.style.display === "none" ? "block" : "none";
  }
  
  async function logout() {
    try {
      const response = await fetch('/store/users/dashboard/logout', {
        method: 'GET',
        credentials: 'include', // Include credentials (cookies)
      });
  
      if (response.ok) {
        // Clear the token on the client side
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  
        location.reload();
  
        // Redirect the user to the login page
        window.location.href = '/user/login';
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
  
  function openDeleteModal(productId) {
    var modal = document.getElementById('deleteModal');
    modal.style.display = 'block';
  
    // Pass the product ID to the deleteProductConfirmed function
    deleteProductConfirmed.productId = productId;
  }
  
  function closeDeleteModal() {
    var modal = document.getElementById('deleteModal');
    modal.style.display = 'none';
  }
  
  async function deleteProductConfirmed() {
    try {
      // Get the product ID from the deleteProductConfirmed function
      const productId = deleteProductConfirmed.productId;
  
      const response = await fetch(`/store/users/dashboard/${productId}?_method=DELETE`, {
        method: 'POST', // Use POST instead of DELETE for form submission
        credentials: 'include',
      });
  
      if (response.ok) {
        // Handle success, e.g., remove the product from the UI
        document.getElementById(`editForm-${productId}`).remove(); // Remove the edit form if it exists
        closeDeleteModal(); // Close the modal
        location.reload();
      } else {
        console.error('Delete failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during delete:', error);
    }
  }
  