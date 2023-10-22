import { forwardRef, useImperativeHandle, useState } from 'react'

const Togglable = forwardRef(
	({ children, buttonLabel = 'show add blog' }, refs) => {
		const [visible, setVisible] = useState(false)

		const hideWhenVisible = { display: visible ? 'none' : '' }
		const showWhenVisible = { display: visible ? '' : 'none' }
		const toggleVisibility = () => {
			setVisible((prev) => !prev)
		}

		useImperativeHandle(refs, () => toggleVisibility)

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
)

export default Togglable
