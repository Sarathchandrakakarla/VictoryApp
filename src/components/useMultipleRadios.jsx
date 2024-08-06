import {useState} from 'react';

const useRadioGroups = initialValues => {
  const [values, setValues] = useState(initialValues);

  /* const handleChange = groupName => event => {
    console.log(1)
    setValues({
      ...values,
      [groupName]: event.target.value,
    });
  }; */
  const handleChange = ele => {
    setValues(ele);
  };

  return [values, handleChange];
};

export default useRadioGroups;
