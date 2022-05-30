import "./FilterInput.css"

export default function FilterInput({ value, handleChange }) {
  return (
    <div className="FilterInput">
      <i className="material-icons">search</i>
      <input
        type="text"
        placeholder={"Search transactions"}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}
