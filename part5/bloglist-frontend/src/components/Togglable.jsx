import { useState } from 'react'

const Togglable = ({ children, buttonLabel = 'show add blog' }) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible((prev) => !prev)
	}

	return (
		<>
			<button onClick={toggleVisibility} style={hideWhenVisible}>
				{buttonLabel}
			</button>
			<section style={showWhenVisible}>
				{children}
				<button onClick={toggleVisibility}>cancel</button>
			</section>
		</>
	)
}

export default Togglable
