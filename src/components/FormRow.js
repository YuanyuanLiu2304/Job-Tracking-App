const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        className="form-input"
        onChange={handleChange}
      />
    </div>
  );
};

export default FormRow;
