import '../../styles/TextField.css';

import React from 'react';

export const TextField = ({
  attributes: { type, id, name, required, label },
  values: { fieldValue, error },
  actions: { setValue },
}) => (
  <div className={`relative h-12 overflow-visible textfield w-96 mb-5 mt-4`}>
    <input
      type={type}
      id={id}
      name={name}
      required={required}
      placeholder=" "
      className="h-full w-full px-2 transition-all border-blue rounded-sm focus:border-green-500 focus:outline-none "
      value={fieldValue}
      onChange={setValue}
    />
    <label htmlFor={id} className="absolute left-2 transition-all bg-white px-1 text-green-600 ">
      {label}
    </label>
    <span className={`text-sm text-red-600 block ${error ? '' : 'hidden'}`} id="error">
      {error}
    </span>
  </div>
);
