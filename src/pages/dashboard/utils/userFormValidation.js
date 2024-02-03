import { authRegex } from 'constant';

export const validateForm = (fields) => {
  const newErrors = {};

  fields.forEach((field) => {
    const { key, label, value, optional = true, condition = true } = field;

    if (optional && condition && !value.trim()) {
      newErrors[key] = `*${label} is required`;
    }

    if (!newErrors.email && key === 'email' && !authRegex.email.test(value)) {
      newErrors.email = '*Email is not valid';
    }

    if (!newErrors.nic && key === 'nic' && !authRegex.nicNumber.test(value)) {
      newErrors.nic = '*NIC is not valid';
    }

    if (key === 'phoneNum' && !authRegex.phoneNumber.test(value)) {
      newErrors.phoneNum = '*Phone number is not valid';
    }
  });

  return newErrors;
};
