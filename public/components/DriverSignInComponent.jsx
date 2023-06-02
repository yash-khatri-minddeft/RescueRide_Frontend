import axios from 'axios';
import React, { useRef } from 'react'
import Loader from './Loader';


export default function DriverSignInComponent({ setIsProcessing, setToastText, setMaskedEmail, isLoading, setIsLoading }) {
	const email = useRef();
	const password = useRef();
	const handleSubmit = async e => {
		e.preventDefault();
		setIsLoading(true)
		try {
			const response = await axios.post('/api/driver/driver-login', {
				email: email.current.value,
				password: password.current.value
			})
			if (response.data.success) {
				setToastText({ text: 'OTP sent!', type: 'success' })
				setIsProcessing(true)
				setMaskedEmail(response.data.message)
			} else {
				setToastText({ text: response.data.message, type: 'error' })
			}
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<>
			{isLoading && <Loader />}
			<div className='login-box'>
				<form onSubmit={handleSubmit}>
					<h2 className='login-title'>Driver SignIn</h2>
					<div className='login-input-container'>
						<div className='input-box'>
							<label htmlFor='email'>Email:<span>*</span></label>
							<input type='email' id='email' autoFocus required ref={email} />
						</div>
						<div className='input-box'>
							<label htmlFor='password'>Password:<span>*</span></label>
							<input type='password' id='password' required ref={password} />
						</div>
						<div className='input-box' style={{ marginTop: '15px' }}>
							<button>Sign In</button>
						</div>
					</div>
				</form>
			</div>
		</>
	)
}