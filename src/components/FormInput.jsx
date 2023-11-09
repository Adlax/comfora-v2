import React from "react";

const FormInput = ({ label, name, type, defaultValue, size }) => {
	return (
		<div className="form-control">
			<label htmlFor="" className="label">
				<span className="label-text capitalize">{label}</span>
			</label>
			<input type={type} defaultValue={defaultValue} className={`input input-bordered ${size}`} name={name} />
		</div>
	);
};

export default FormInput;
