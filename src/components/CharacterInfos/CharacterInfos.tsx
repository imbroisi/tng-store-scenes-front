import { CHARACTERS_ACTIONS } from '../../config';
import { Container } from './CharacterInfos.styles';
import Option from '../Option';

export interface CharacterInfosProps {
  optionsSelecteds: any
  character: string
  onChange: (a: string, b: string, c: boolean) => void
}

export default function CharacterInfos({ character, optionsSelecteds, onChange }: CharacterInfosProps) {

  // console.log('>>>>>>> optionsSelecteds', JSON.stringify(optionsSelecteds));

  return (
    <Container>
      {
        Object.keys(CHARACTERS_ACTIONS).map((action: string) => {
          return (
            <div style={{ marginBottom: '16px' }}>
              <div>
                <b>{action.toLowerCase()}</b>
              </div>
              { 
                (CHARACTERS_ACTIONS as any)[action].map((characterAction: string) => {
                  // console.log('\n->>> character', character);
                  // console.log('->>> action', action);
                  // console.log('->>> characterAction', characterAction);
                  // console.log('->>> optionsSelecteds[character]', JSON.stringify(optionsSelecteds[character]));
                  // console.log('->>> optionsSelecteds[character][action]', optionsSelecteds[character]?.[action]);

                  return (
                    <Option
                      key={characterAction}
                      label={characterAction}
                      checked={!!optionsSelecteds[character]?.[action]?.[characterAction]}
                      // checked={!!checkedCharacters[character as any]}
                      // checked={false}

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
