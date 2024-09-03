import Box from '../Box';
import { Container } from './CharacterCheckbox.styles';

export interface CharacterBoxProps {
  character: string;
}

export default function CharacterCheckbox({ character }: CharacterBoxProps) {
  return (
    <Container>
      <Box>
        <input type="checkbox" name={character} value={character} />
        {character}
      </Box>
    </Container>
  );
}
