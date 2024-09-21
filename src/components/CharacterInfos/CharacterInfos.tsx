import { CHARACTERS_ACTIONS } from '../../config';
import { Container } from './CharacterInfos.styles';
import Option from '../Option';
import { useEffect } from 'react';

const ACTIONS_KEYS = Object.keys(CHARACTERS_ACTIONS);
export interface CharacterInfosProps {
  optionsSelecteds: any
  character: string
  onChange: (a: string, b: string, c: boolean) => void
}

export default function CharacterInfos({ character, optionsSelecteds, onChange }: CharacterInfosProps) {

  // console.log('>>>>>>> optionsSelecteds', JSON.stringify(optionsSelecteds));

  useEffect(() => {
    if (!optionsSelecteds[character]) {
      onChange('ALL', 'ignore', true);
    }
  }, []);

  return (
    <Container>
      {
        ACTIONS_KEYS.map((action: string) => {
          const name = `${character}_${action}`;

          return (
            <div key={action} id={action} style={{ marginBottom: '16px' }}>
              <div style={{ marginBottom: '8px', borderBottom: '1px solid #ddd', paddingBottom: '4px' }}>
                <b>{action.toLowerCase()}</b>
              </div>
              {                 
                (CHARACTERS_ACTIONS as any)[action].map((characterAction: string) => {
                  const checked = optionsSelecteds[character]?.[action] === characterAction;

                  return (
                    <Option
                      key={characterAction}
                      isRadio
                      name={name}
                      label={characterAction}
                      checked={checked}
                      onChange={(label, checked) => onChange(action, label, checked)}
                    />
                  )
                })
              }
            </div>    
          )
        })
      }
    </Container>
  );
}
