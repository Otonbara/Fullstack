import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider, db } from '../firebaseConfig';
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { setDoc, doc } from 'firebase/firestore';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Sign in with Google
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Save user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        fullName: user.displayName || '',
        bio: '',
        skills: '',
        qualification: '',
        education: '',
        experience: '',
        isCompany: false,
        profilePic: '',
      });

      navigate('/profile'); // Redirect to profile page after successful sign-in
    } catch (error) {
      console.error("Error during Google Sign-In:", error.message);
      setErrorMessage(error.message);
    }
  };

  // Register with Email and Password
  const handleEmailRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Save user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        fullName: '',
        bio: '',
        skills: '',
        qualification: '',
        education: '',
        experience: '',
        isCompany: false,
        profilePic: '',
      });

        navigate('/profile'); // Redirect to profile page after successful registration
      } catch (error) {
        console.error("Error during Email Registration:", error.message);
        setErrorMessage(error.message);  // Display error message if registration fails
      } finally {
        setLoading(false);  // Reset loading state
      }
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Register</h2>

      {/* Google Sign-In Button */}
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center bg-red-500 text-white py-2 px-4 rounded mb-4 hover:bg-red-600 transition duration-300"
      >
        <FontAwesomeIcon icon={faGoogle} className="mr-2" />
        Sign Up with Google
      </button>

      {/* Error Message */}
      {errorMessage && (
        <div className="text-red-500 mb-4">
          <p>{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleEmailRegister} className="w-full max-w-sm bg-white p-6 rounded shadow-md">
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
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register with Email'}
        </button>
      </form>

      <p className="mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default Register;
