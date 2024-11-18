import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/20/solid';
import { BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/solid';
import { signOut } from 'firebase/auth';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    bio: '',
    isCompany: false,
    skills: '',
  });

  const user = auth.currentUser;
  const navigate = useNavigate();

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
          setFormData(userSnap.data());
          if (userSnap.data().profilePic) {
            setPreview(userSnap.data().profilePic);
          }
        }
      }
    };

    fetchUserData();
  }, [user]);

  // Handle file input change for profile picture
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle toggle switch change for company/individual
  const handleToggle = () => {
    setFormData({ ...formData, isCompany: !formData.isCompany });
  };

  // Save user data to Firestore
  const handleSave = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Upload profile picture to Firebase Storage if new picture is selected
      let profilePicUrl = preview;
      if (profilePic) {
        const storageRef = ref(storage, `profilePics/${user.uid}`);
        await uploadBytes(storageRef, profilePic);
        profilePicUrl = await getDownloadURL(storageRef);
      }

      // Save user data to Firestore
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        ...formData,
        profilePic: profilePicUrl,
      });

      setLoading(false);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      setLoading(false);
      alert('Failed to update profile');
    }
  };

  // Handle sign-out
  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-8">
          {/* Profile Picture */}
          <div className="relative">
            <img
              src={preview || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-600 object-cover"
            />
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center cursor-pointer opacity-0 z-10"
              />
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center cursor-pointer">
                <PlusIcon className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
          {/* User Info */}
          <div>
            <h2 className="text-3xl font-bold text-blue-600">{formData.fullName || 'Your Name'}</h2>
            <p className="text-gray-700">{formData.bio || 'Add a short bio'}</p>
          </div>
        </div>

        {/* Profile Sections */}
        <form className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-600">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-gray-600">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:border-blue-600"
              placeholder="A brief introduction about yourself"
            />
          </div>

          {/* Toggle Switch for Individual / Company */}
          <div className="flex items-center justify-between">
            <label className="text-gray-700 font-medium">Account Type:</label>
            <div
              className={`flex items-center cursor-pointer rounded-full p-1 w-28 transition-colors duration-300 ${
                formData.isCompany ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              onClick={handleToggle}
            >
              {/* Individual Icon */}
              <UserIcon
                className={`h-5 w-3 text-white transition-opacity duration-300 ${
                  formData.isCompany ? 'opacity-0' : 'opacity-100'
                }`}
              />

              {/* Company Icon */}
              <BuildingOfficeIcon
                className={`h-5 w-3 text-white transition-opacity duration-300 ${
                  formData.isCompany ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Toggle Knob */}
              <div
                className={`bg-white rounded-full w-8 h-8 shadow-md transform transition-transform duration-300 ${
                  formData.isCompany ? 'translate-x-12' : 'translate-x-0'
                }`}
              ></div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-gray-600">Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:border-blue-600"
              placeholder="E.g., JavaScript, React, Django"
            />
          </div>

          {/* Save Button */}
          <button
            type="button"
            onClick={handleSave}
            className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </button>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-300"
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
