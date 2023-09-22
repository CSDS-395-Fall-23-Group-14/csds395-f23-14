import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

import './googleAuth.css';

function GoogleAuth() {
  const handleGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }
  
  return (
    <div>
      <button onClick={handleGoogle}>Sign in with Google</button>
    </div>
  )
}

export default GoogleAuth;