import { useState } from 'react';
import CharactersContainer from '../CharactersContainer';
import { Container } from './App.styles';
import CharactersDataContainer from '../CharactersDataContainer';
import LocaisContainer from '../LocaisContainer';
import Box from '../Box';

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

  return (
    <Container>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ border: '1px solid #aaa', padding: '16px', margin:'16px' }}>
          <label style={{ paddingTop: '12px' }}>Scene File Name:</label>
          <input type="text" style={{ width: '97%' }} />
        </div>
        <div style={{ display: 'flex' }}>
          <LocaisContainer localSelected={localSelected} onChange={handleLocalChanged} />
          <CharactersContainer checkedCharacters={checkedCharacters} onChange={handleCharacterChanged} />
        </div>
      </div>
      <CharactersDataContainer optionsSelecteds={optionsSelecteds} checkedCharacters={checkedCharacters} onChange={handleOptionChanged} />
    </Container>
  );
}
