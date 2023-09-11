const FormRowSelect = ({
  status,
  labelText,
  name,
  handleChange,
  statusOptions,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>

      <select
        name={name}
        id={name}
        value={status}
        onChange={handleChange}
        className="form-select"
      >
        {statusOptions.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
