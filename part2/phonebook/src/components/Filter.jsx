const Filter = ({ searchVal, handleInput }) => {
	return (
		<>
			filter shown with{' '}
			<input
				placeholder="search..."
				value={searchVal}
				onChange={handleInput}
			/>
		</>
	)
}

export default Filter;