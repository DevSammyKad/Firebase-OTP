import 'tailwindcss/tailwind.css';
import { CgSpinner } from 'react-icons/cg';
import toast, { Toaster } from 'react-hot-toast';

import phoneimg from './images/phoneimg.png';
import otpimg from './images/otpimg.png';

import OtpInput from 'otp-input-react';
import { useState } from 'react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

import { auth } from './firebase.config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

function App() {
  const [otp, setOtp] = useState('');
  const [ph, setPh] = useState('');

  const [loading, setLoading] = useState(false);
  const [showOTP, setOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response) => {
            onSignup();
          },
          'expired-callback': () => {},
        },
        auth
      );
    }
  }
  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = '+' + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setOTP(true);
        toast.success('OTP Sended Succsesfully');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        // Check if the error is due to an invalid phone number
        if (error.code === 'auth/invalid-phone-number') {
          toast.error(
            'Invalid Phone Number. Please enter a valid phone number.'
          );
        } else {
          // Handle other error cases as needed
          toast.error('An error occurred. Please try again.');
        }
      });
  }
  function onOTPVerify() {
    setLoading(true);

    window.confirmationResult
      .confirm(otp)
      .then((res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
        toast.success('Login Successfully');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        // Handle other error cases as needed
        toast.error('An error occurred. Please try again.');
      });
  }

  return (
    <section className="bg-gradient-to-r from-[#E5E5E5] to-[#fff9d2] flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="font-semibold text-2xl text-center text-slate-700">
            login succses
          </h2>
        ) : (
          <div className="w-96 flex flex-col gap-4 shadow-lg rounded-xl p-10 bg-white border ">
            <h1 className="text-center leading-normal  text-xl mb-6 font-medium text-slate-700">
              Welcome To <br />
              RSAI FOUNDATION
            </h1>
            {showOTP ? (
              <>
                <div className="bg-[#FCFDFF] w-fit mx-auto my-4 p-4 rounded-full">
                  <img
                    className="w-36 h-32 mix-blend-multiply"
                    src={otpimg}
                    alt="otp Img"
                  />
                </div>
                <label
                  htmlFor="otp"
                  className="font-semibold text-2xl text-center text-white"
                >
                  Enter Your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disable={false}
                  autoFocus
                  className="otp-container"
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="bg-gradient-to-r from-[#f07777] to-[#e8e1b7] w-full flex items-center justify-center py-2.5 mt-6  text-white font-medium rounded-md"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin mr-4" />
                  )}

                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-[#FCFDFF] w-fit mx-auto my-4 p-4 rounded-full">
                  <img
                    className="w-32 h-32 mix-blend-multiply"
                    src={phoneimg}
                    alt="Phone Img"
                  />
                </div>
                <label
                  htmlFor="ph"
                  className="font-semibold text-sm text-center text-[#9E9E9E] "
                >
                  Verify Your Phone Number*
                </label>
                <PhoneInput country={'in'} value={ph} onChange={setPh} />

                <button
                  onClick={onSignup}
                  disabled={loading}
                  className="bg-gradient-to-r from-[#f07777] to-[#e8e1b7] w-full flex items-center justify-center py-2.5 mt-6 text-white font-medium rounded-md"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin mr-4" />
                  )}

                  <span>Send Code Via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
