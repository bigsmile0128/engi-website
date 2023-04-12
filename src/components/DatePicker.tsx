import classNames from 'classnames';
import { InputHTMLAttributes, forwardRef, useState } from 'react';
import DatePickerComponent from 'react-datepicker';
import { RiCalendarLine } from 'react-icons/ri';
import Input from './global/Input/Input';
import 'react-datepicker/dist/react-datepicker.css';

const CustomInput = forwardRef(
  (
    {
      value,
      onClick,
      className,
      disabled,
    }: InputHTMLAttributes<HTMLInputElement>,
    ref
  ) => {
    return (
      <div className={classNames('relative w-full backdr', className)}>
        <Input
          className="w-full"
          inputRef={ref}
          value={value}
          onClick={onClick}
          disabled={disabled}
        />
        <RiCalendarLine
          className={classNames(
            'h-6 w-6 absolute top-0 right-4 translate-y-center pointer-events-none',
            disabled ? 'text-white/60' : 'text-white'
          )}
        />
      </div>
    );
  }
);

CustomInput.displayName = 'CustomInput';

export default function DatePicker(props) {
  const [date, setDate] = useState(new Date());
  return (
    <DatePickerComponent
      customInput={<CustomInput />}
      selected={date}
      onChange={(date) => setDate(date)}
      showPopperArrow={false}
      popperPlacement="bottom-end"
      {...props}
    />
  );
}
