// Firebase configuration
import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyAN-AGEeox29QuOZiDYPiaTf6Lv-_7tt-8",
    authDomain: "freelance-project-4b7e9.firebaseapp.com",
    databaseURL: "https://freelance-project-4b7e9-default-rtdb.firebaseio.com",
    projectId: "freelance-project-4b7e9",
    storageBucket: "freelance-project-4b7e9.appspot.com",
    messagingSenderId: "571605113617",
    appId: "1:571605113617:web:04883768c7eabaaf498ab0"
  };
  firebase.initializeApp(firebaseConfig);

  // Initialize ReCAPTCHA
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': function(response) {
          // reCAPTCHA solved, allow phone verification
          onSignInSubmit();
      }
  });
  
  // Function to trigger phone number verification
  function verifyPhoneNumber() {
      const phoneNumber = document.getElementById('phone').value;
      const appVerifier = window.recaptchaVerifier;
  
      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(function (confirmationResult) {
              // SMS sent. Prompt user to type the code from the message
              window.confirmationResult = confirmationResult;
              alert('Verification code sent to your phone.');
          }).catch(function (error) {
              console.error('Error during signInWithPhoneNumber', error);
              alert('Error verifying phone number. Please try again.');
          });
  }
  
  // Event listener for the "Verify" button
  document.getElementById('verifyPhone').addEventListener('click', function() {
      verifyPhoneNumber();
  });
  
  // Function to handle code verification
  document.getElementById('verifyCode').addEventListener('click', function() {
      const code = document.getElementById('code').value;
      confirmationResult.confirm(code).then(function (result) {
          // User signed in successfully
          const user = result.user;
          alert('Phone number verified successfully.');
      }).catch(function (error) {
          console.error('Error verifying code:', error);
          alert('Error verifying verification code. Please try again.');
      });
  });