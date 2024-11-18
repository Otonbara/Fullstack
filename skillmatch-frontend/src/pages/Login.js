import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebaseConfig';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  // Loading state for the login process
  const [errorMessage, setErrorMessage] = useState('');  // Error state to capture and display errors

  // Sign in with Google
  const handleGoogleSignIn = async () => {
    setLoading(true);  // Set loading to true when Google sign-in starts
    setErrorMessage(''); // Clear any previous error messages
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/profile'); // Redirect to profile page after successful sign-in
    } catch (error) {
      console.error("Error during Google Sign-In:", error.message);
      setErrorMessage(error.message);  // Display error message if Google sign-in fails
    } finally {
      setLoading(false);  // Reset loading state after the process
    }
  };

  // Login with Email and Password
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading to true when email login starts
    setErrorMessage(''); // Clear any previous error messages
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/profile'); // Redirect to profile page after successful login
    } catch (error) {
      console.error("Error during Email Login:", error.message);
      setErrorMessage(error.message);  // Display error message if email login fails
    } finally {
      setLoading(false);  // Reset loading state after the process
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Login</h2>

      {/* Google Sign-In Button */}
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center bg-red-500 text-white py-2 px-4 rounded mb-4 hover:bg-red-600 transition duration-300"
        disabled={loading}  // Disable the button during the loading state
      >
        <FontAwesomeIcon icon={faGoogle} className="mr-2" />
        {loading ? 'Signing In...' : 'Sign In with Google'}
      </button>

      {/* Error Message */}
      {errorMessage && (
        <div className="text-red-500 mb-4">
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Email Login Form */}
      <form onSubmit={handleEmailLogin} className="w-full max-w-sm bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}  // Disable the button during the loading state
        >
          {loading ? 'Logging In...' : 'Login with Email'}
        </button>
      </form>

      <p className="mt-4">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
