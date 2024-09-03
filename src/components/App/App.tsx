import { useState } from 'react';
import CharactersContainer from '../CharactersContainer';
import { Container } from './App.styles';
import CharactersDataContainer from '../CharactersDataContainer';
import LocaisContainer from '../LocaisContainer';

export default function App() {
  const [localSelected, setLocalSelected] = useState('Bridge');
  const [checkedCharacters, setCheckedCharacters] = useState({});
  const [optionsSelecteds, setOptionsSelecteds] = useState<{ [key: string]: any }>({});

  const handleLocalChanged = (local: string) => {
    setLocalSelected(local);
  }

  const handleCharacterChanged = (character: string, isChecked: boolean) => {
    setCheckedCharacters({
      ...checkedCharacters,
      [character]: isChecked 
    });
  }

  const handleOptionChanged = (
    character: string, 
    optionName: string, 
    optionChanged: string, 
    isChecked: boolean
  ) => {
    setOptionsSelecteds({
      ...optionsSelecteds,
      [character]: {
        ...optionsSelecteds[character],
        [optionName]: {
          ...optionsSelecteds[character]?.[optionName],
         [optionChanged]: isChecked
       }
      }
    });
  };

  console.log('--->>>>', optionsSelecteds)

  return (
    <Container>
      <LocaisContainer localSelected={localSelected} onChange={handleLocalChanged} />
      <CharactersContainer checkedCharacters={checkedCharacters} onChange={handleCharacterChanged} />
      <CharactersDataContainer optionsSelecteds={optionsSelecteds} checkedCharacters={checkedCharacters} onChange={handleOptionChanged} />
    </Container>
  );
}
