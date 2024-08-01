import { useEffect } from 'react';
import GoogleButton from 'react-google-button';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const { googleSignIn, user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
    } catch(error) {
      console.log(error);
    }
  }

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user !== null) navigate('/account');
  }, [user]);

  const signIn = (
    <>
      <h1>Sign In</h1>
      <div className="justify-center">
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
    </>
  );

  const signOut = (
    <>
      <h1 onClick={handleSignOut}>Sign Out</h1>
    </>
  )

  return (
    <div>
      {user?.displayName ? signOut : signIn}
    </div>
  )

}

export default Signin;
  