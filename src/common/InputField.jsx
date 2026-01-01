
  // const InputField = ({ 
  // label, 
  // field, 
  // type = 'text', 
  // placeholder,
  // value,
  // onChange,
  // onBlur,
  // errors
  // }) => (
  //   <div className="mb-4">
  //     <label className="text-lg" htmlFor="">{label}</label>
  //     <input
  //       type={type}
  //       placeholder={placeholder || label}
  //       value={value}
  //       onChange={(e) => onChange(field, e.target.value)}
  //        onBlur={() => onBlur(field)} 
  //       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent transition-colors ${
  //         errors[field] ? 'border-red-300 bg-red-50' : 'border-gray-300'
  //       }`}
  //     />
  //     {errors[field] && (
  //       <p className="text-red-500 text-sm mt-1">
  //         *{errors[field]}
  //       </p>
  //     )}
  //   </div>
  // );

  // export default InputField

const InputField = ({ label, field, value, onChange, errors, type = "text" }) => {
  return (
    <div className="mb-2">
      <input
        type={type}
        value={value}
        onChange={onChange}
        onBlur={() => onChange(field, value, true)} 
        className="border border-gray-300 rounded-lg p-3 w-full"
        placeholder={label}
      />
      {errors?.[field] && (
        <p className="text-red-500 text-sm">{errors[field]}</p>
      )}
    </div>
  );
};

export default InputField;
