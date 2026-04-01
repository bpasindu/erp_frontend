import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Page1.css';
import { API_BASE_URL } from '../../config';

const Page1 = () => {
  const [view, setView] = useState('LOGIN'); // LOGIN, REGISTER, FORGOT_PASSWORD
  const navigate = useNavigate();

  // Common State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register State
  const [regName, setRegName] = useState('');
  const [regOwnerEmail, setRegOwnerEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regCurrency, setRegCurrency] = useState('LKR');

  // Forgot Password State
  const [forgotBusinessName, setForgotBusinessName] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');

  const resetMessages = () => {
    setError('');
    setSuccess('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    resetMessages();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data));
        navigate(data.data.role === 'ADMIN' || data.data.role === 'SUPER_ADMIN' ? '/admin/dashboard' : '/home');
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Network error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    resetMessages();
    setLoading(true);

    try {
      const payload = {
        name: regName,
        currency: regCurrency,
        status: 'ACTIVE',
        plan: 'Free',
        ownerEmail: regOwnerEmail,
        defaultPassword: regPassword
      };

      const res = await fetch(`${API_BASE_URL}/api/businesses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess('Business registered successfully! Please login with your credentials.');
        setLoginEmail(regOwnerEmail);
        setView('LOGIN');
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      setError('Network error during registration.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    resetMessages();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: forgotBusinessName,
          email: forgotEmail,
          newPassword: forgotNewPassword
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess('Password updated successfully! You can now sign in.');
        setView('LOGIN');
      } else {
        setError(data.message || 'Verification failed. Please check your details.');
      }
    } catch (err) {
      setError('Network error during password reset.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className={`login-card ${view === 'REGISTER' ? 'wide-card' : ''}`}>
        <div className="login-header">
          <h1 className="login-logo">SmartBiz</h1>
          <p className="login-subtitle">
            {view === 'LOGIN' && 'Sign in to your account'}
            {view === 'REGISTER' && 'Create your business account'}
            {view === 'FORGOT_PASSWORD' && 'Recover your account'}
          </p>
        </div>
        
        {error && <div className="login-alert error">{error}</div>}
        {success && <div className="login-alert success">{success}</div>}

        {view === 'LOGIN' && (
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                placeholder="you@example.com" 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
            <div className="login-footer">
              <span className="auth-link" onClick={() => { setView('FORGOT_PASSWORD'); resetMessages(); }}>Forgot password?</span>
              <p className="switch-text">New to SmartBiz? <span className="auth-link secondary" onClick={() => { setView('REGISTER'); resetMessages(); }}>Create an account</span></p>
            </div>
          </form>
        )}

        {view === 'REGISTER' && (
          <form className="login-form" onSubmit={handleRegister}>
            <div className="form-row">
              <div className="form-group">
                <label>Business Name</label>
                <input 
                  type="text" 
                  placeholder="Acme Corp" 
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Currency</label>
                <select value={regCurrency} onChange={(e) => setRegCurrency(e.target.value)}>
                  <option value="LKR">LKR (Rs.)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Owner Email</label>
              <input 
                type="email" 
                placeholder="owner@example.com" 
                value={regOwnerEmail}
                onChange={(e) => setRegOwnerEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Set Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Creating Account...' : 'Register Business'}
            </button>
            <div className="login-footer">
              <p className="switch-text">Already have an account? <span className="auth-link" onClick={() => { setView('LOGIN'); resetMessages(); }}>Sign In</span></p>
            </div>
          </form>
        )}

        {view === 'FORGOT_PASSWORD' && (
          <form className="login-form" onSubmit={handleForgotPassword}>
            <div className="form-group">
              <label>Business Name</label>
              <input 
                type="text" 
                placeholder="Confirm your business name" 
                value={forgotBusinessName}
                onChange={(e) => setForgotBusinessName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Owner Email</label>
              <input 
                type="email" 
                placeholder="Confirm your registered email" 
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input 
                type="password" 
                placeholder="Enter new password" 
                value={forgotNewPassword}
                onChange={(e) => setForgotNewPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Verifying...' : 'Reset Password'}
            </button>
            <div className="login-footer">
              <p className="switch-text">Remember your password? <span className="auth-link" onClick={() => { setView('LOGIN'); resetMessages(); }}>Back to Sign In</span></p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Page1;