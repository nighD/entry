import React, { useEffect } from 'react';
import Select, {MultiValue} from 'react-select';
import { OptionProp } from '../types';

interface DropdownProps {
  label: string;
  value: MultiValue<OptionProp> | null;
  options: MultiValue<OptionProp>;
  onSelect: (data:MultiValue<OptionProp>) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label,value,options, onSelect }) => {

  return (
    <div className="flex-auto">
      <Select
        isMulti
        placeholder={label}
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={(selectedOption) => {
          onSelect(selectedOption)
        }}
        value={value}
        styles={{
          control: (provided, state) => ({
            ...provided,
            height: '40px',
            minHeight: '40px',
          }),
        }}

      />
    </div>
  );
};

export default Dropdown;
