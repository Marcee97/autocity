import "../styles/selectField.css";
export const SelectField = ({ options, label, onChange, value }) => {
  return (
    <div className="select-field">
      <label>{label}</label>
      <select
        name="marcas"
        className="cont-select-field"
        onChange={(e) => onChange(e.target.value)}
      >
        <option >{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
