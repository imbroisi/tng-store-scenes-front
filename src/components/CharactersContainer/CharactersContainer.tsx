import { CHARACTERS } from '../../config';
import Box from '../Box';
import Option from '../Option';

export default function CharactersContainer({ checkedCharacters, onChange }: any) {
  return (
    <Box>
      <h4>Characters</h4>
      {
        CHARACTERS.map((character) => (
          <Option
            key={character}
            label={character}
            checked={!!checkedCharacters[character as any]}
            onChange={onChange}
          />
        ))
      }
    </Box>
  );
}
