import { CHARACTERS } from '../../config';
import Box from '../Box';
import CharacterInfos from '../CharacterInfos';
import { Container } from './CharactersDataContainer.styles';

export interface CharactersDataContainerProps {
  optionsSelecteds: any
  checkedCharacters: any
  onChange: (a: string, b: string, c: string, d:boolean) => void
}

export default function CharactersDataContainer({ optionsSelecteds, checkedCharacters, onChange }: CharactersDataContainerProps) {
  const handleCharacterChanged = (character: string, optionName: string, optionChanged: string, isChecked: boolean) => {
    onChange(character, optionName, optionChanged, isChecked);
  }

  return (
    <Container>
      {
        CHARACTERS.map((character) => {
          if (!checkedCharacters[character]) {
            return;
          }

          return (
            <Box key={character}>
              <h3 style={{ textAlign: 'center' }}>{character}</h3>
              <CharacterInfos character={character} optionsSelecteds={optionsSelecteds} onChange={(action, label, checked) => {
                handleCharacterChanged(character, action, label, checked);
              }} />
            </Box>
          )
        })
      }
    </Container>
  );
}
