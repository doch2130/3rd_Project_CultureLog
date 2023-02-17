import React from 'react';
import landingLogo from '../../src/logo.png';
import Auth from '../../src/hoc/auth';
import githubLogo from '../github.png';

function LandingPage() {
  return (
    <>
      <div style={{ display: 'flex', padding: '50px', alignItems: 'center' }}>
        <div style={{ width: '1000px', padding: '20px' }}>
          <span style={{ color: '#545d42', fontSize: '4rem' }}>
            나만의 문화 기록, Culture Log
          </span>
          <br />
          <br />
          <br />
          <span style={{ color: '#252e12', fontSize: '1rem' }}>
            로그인 버튼을 눌러 로그인을 먼저 해주세요
          </span>
          <br />
          <br />
          <div
            style={{
              display: 'flex',
              padding: '50px',
              alignItems: 'center',
              borderColor: '#545d42',
              borderBlockStyle: 'dashed',
            }}
          >
            <span style={{ color: '#545d42', fontSize: '1rem' }}>
              github{' '}
              <a href="https://github.com/CultureBox/3rd_Project">
                <img
                  src={githubLogo}
                  style={{ width: '30px' }}
                  alt="github 주소"
                />
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth(LandingPage, false);
