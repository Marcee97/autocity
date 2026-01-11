import "../styles/selectField.css";

export const SelectField = ({ options, label, onChange, value }) => {
  return (
    <div className="select-field">
      <label>{label}</label>
      <select
        className="cont-select-field"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      >
        <option value="">{label}</option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="select-field-options"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
