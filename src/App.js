import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import axios from 'axios';
let baseUrl = '' //  url got after starting deploying the serverless application
function PhoneVerification() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [phoneValidationMessage, setPhoneValidationMessage] = useState('');
  const [codeMessage, setCodeValidationMessage] = useState('');

  //function to handle the phone number input
  function handlePhoneNumberChange(value) {
    setPhoneValidationMessage('')
    setPhoneNumber(value);
  }
  //function to handle the verification code input
  function handleVerificationCodeChange(event) {
    setCodeValidationMessage('')
    setVerificationCode(event.target.value);
  }
  //function calling the send otp api 
  function handleSendVerificationCode() {
    console.log("verification caose",phoneNumber)
    if(phoneNumber == ''){
      setPhoneValidationMessage('Please enter the Phone Number before sending verification code')
      return
    }
    // Send the verification code to the user's phone number
    axios.post(`${baseurl}/send-otp`, {     //provided aws url for send otp
      phone: phoneNumber
    })
    .then(function (response) {
      console.log(response);
      setVerificationSent(true);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  //function to call verify otp api
  function handleVerifyPhoneNumber() {
    if(verificationCode == ''){
      setCodeValidationMessage('Please enter the code before submitting')
      return
    }
    // Verify the verification code entered by the user
    axios.post(`${baseUrl}/verifyOtp`, {     //provided aws url for send otp
      otp: verificationCode,
      phone:phoneNumber
    })
    .then(function (response) {
      console.log(response);
      //redirect to next page
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div>
      <h2>Verify Your Phone Number</h2>
      {phoneValidationMessage != '' ? <p style={{'color':'red'}}>{phoneValidationMessage}</p> : ''}
      <PhoneInput
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
      />
      <br />
      <button onClick={handleSendVerificationCode}>Send Verification Code</button>
      {verificationSent && (
        <div>
          <p>Enter the verification code sent to your phone:</p>
          {codeMessage != '' ? <p style={{'color':'red'}}>{codeMessage}</p> : ''}
          <input type="text" value={verificationCode} onChange={handleVerificationCodeChange} />
          <br />
          <button onClick={handleVerifyPhoneNumber}>Verify Phone Number</button>
        </div>
      )}
    </div>
  );
}

export default PhoneVerification;
