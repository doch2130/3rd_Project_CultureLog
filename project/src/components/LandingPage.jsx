import React from 'react';
import landingLogo from '../../src/logo.png';
import Auth from '../../src/hoc/auth';

function LandingPage() {
  return (
    <>
      <img src={landingLogo} style={{ width: '500px', height: '500px' }} />
    </>
  );
}

export default Auth(LandingPage, false);
