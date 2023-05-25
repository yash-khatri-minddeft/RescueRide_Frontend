import axios from 'axios';
import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

export default function AdminSignInComponent({ setIsProcessing }) {
	const email = useRef();
	const password = useRef();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await axios.post('/api/admin/admin-login', {
			email: email.current.value,
			password: password.current.value
		})
		if(response.data.success) {
			setIsProcessing(true)
		} else {
			alert(response.data.message)
		}
	}
	return (
		<div className="login-box">
			<form onSubmit={handleSubmit}>
				<h2 className="login-title">Admin SignIn</h2>
				<div className="login-input-container">
					<div className="input-box">
						<label htmlFor="email">Email: <span>*</span></label>
						<input type="email" id='email' ref={email} />
					</div>
					<div className="input-box">
						<label htmlFor="password">Password: <span>*</span></label>
						<input type="password" id='password' ref={password} />
					</div>
					<div className="input-box" style={{ marginTop: "15px" }}>
						<button>Sign In</button>
					</div>
				</div>
			</form>
		</div>
	)
}
