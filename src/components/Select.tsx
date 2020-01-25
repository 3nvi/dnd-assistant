import React from 'react';
import ReactSelect, { Props as ReactSelectProps } from 'react-select';

interface ResettedSelectProps extends ReactSelectProps<SelectOption> {
  value: any;
  onChange: any;
}

interface SelectProps extends ResettedSelectProps {
  value: string | string[] | null;
  onChange: (value: string | string[] | null) => void;
}

interface SelectOption {
  label: string;
  value: string;
}

const Select: React.FC<SelectProps> = props => {
  const reactSelectValue = React.useMemo(() => {
    const options = props?.options as SelectOption[];
    return props.isMulti
      ? options.filter(o => (props.value as string[])?.includes(o.value)) || []
      : options.find(o => o.value === (props.value as string)) || null;
  }, [props.options, props.isMulti, props.value]);

  const handleChange = React.useCallback(
    (selected: ReactSelectProps['value']) => {
      return props.isMulti
        ? props.onChange((selected as SelectOption[])?.map(s => s.value) || [])
        : props.onChange((selected as SelectOption)?.value || null);
    },
    [props.options, props.isMulti, props.value]
  );

  return <ReactSelect<SelectOption> {...props} value={reactSelectValue} onChange={handleChange} />;
};

export default Select;
