import { LOCAIS } from '../../config';
import Box from '../Box';
import Option from '../Option';

export interface LocaisContainerProps {
  localSelected: string
  onChange:(a: string) => void
}

export default function LocaisContainer({ localSelected, onChange}: LocaisContainerProps) {
  return (
    <Box>
      <h4>Local</h4>
      {
        LOCAIS.map((local) => (
          <Option
            key={local}
            isRadio
            label={local}
            checked={localSelected === local}
            onChange={onChange}
          />
        ))
      }
    </Box>
  );
}
