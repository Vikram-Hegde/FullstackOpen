const Notification = ({ data }) => {
	if (data === null) return

	return (
		<div className="notification" data-type={`${data.type}`}>
			{data.message}
		</div>
	)
}

export default Notification
