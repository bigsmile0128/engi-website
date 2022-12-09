import ReactSelect, { Props } from 'react-select';

export default function Select(props: Props) {
  return (
    <ReactSelect
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          neutral0: '#000000',
          neutral5: 'rgb(11 11 11)',
          neutral10: 'rgb(23 23 23)',
          neutral20: 'rgb(38 38 38)',
          neutral30: 'rgb(64 64 64)',
          neutral40: 'rgb(82 82 82)',
          neutral50: 'rgb(115 115 115)',
          neutral60: 'rgb(163 163 163)',
          neutral70: 'rgb(212 212 212)',
          neutral80: 'rgb(229 229 229)',
          neutral90: 'rgb(245 245 245)',
          primary: '#65FEB7',
          primary25: '#65FEB740',
          primary50: '#65FEB780',
          primary75: '#65FEB7BF',
        },
      })}
      styles={{
        container: (base) => ({
          ...base,
        }),
        control: (base, state) => ({
          ...base,
          backgroundColor: state.isDisabled
            ? 'rgb(255, 255, 255, 0.1)'
            : 'transparent',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
          },
          padding: 8,
        }),
        indicatorSeparator: (base) => ({
          ...base,
          display: 'none',
        }),
        dropdownIndicator: (base) => ({
          ...base,
          color: 'rgba(255, 255, 255, 0.3)',
          '&:hover': {
            color: 'rgba(255, 255, 255, 0.8)',
          },
        }),
        placeholder: (base) => ({
          ...base,
          color: 'rgba(255, 255, 255, 0.8)',
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: '#374151',
        }),
        loadingIndicator: (base) => ({
          ...base,
          color: 'rgba(255, 255, 255, 0.8)',
        }),
      }}
      {...props}
    />
  );
}
