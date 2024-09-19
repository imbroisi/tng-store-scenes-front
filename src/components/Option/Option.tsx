export interface OptionProps {
  label: string
  checked: boolean
  onChange: (a: string, b:boolean) => void
  isRadio?: boolean | undefined
  name?: string
}

export default function Option({ isRadio, label, checked, onChange, name }: OptionProps) {
  return (
    <label key={label} style={{ whiteSpace: 'nowrap' }}>
      <input
        type={isRadio ? 'radio' : 'checkbox'} 
        name={name}
        checked={checked} 
        onChange={(e) => {
          onChange(label, e.target.checked);
        }} />
      {label}
    </label>
  );
}
