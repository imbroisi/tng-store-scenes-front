import { CHARACTERS_ACTIONS } from '../../config';
import { Container } from './CharacterInfos.styles';
import Option from '../Option';

const ACTIONS_KEYS = Object.keys(CHARACTERS_ACTIONS);
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
        ACTIONS_KEYS.map((action: string) => {
          const name = `${character}_${action}`;
          // const noneSelected = !optionsSelecteds[character]?.[action] || !!optionsSelecteds[character]?.[action]?.none
          
          return (
            <div id={action} style={{ marginBottom: '16px' }}>
              <div>
                <b>{action.toLowerCase()}</b>
              </div>
              {/* <Option
                  isRadio
                  name={name}
                  label="none"
                  checked={noneSelected}
                  onChange={(label, checked) => onChange(action, label, checked)}
                /> */}
              {                 
                (CHARACTERS_ACTIONS as any)[action].map((characterAction: string) => {
                  // console.log('\n->>> character', character);
                  // console.log('->>> action', action);
                  // console.log('->>> characterAction', characterAction);

                  // console.log('->>> optionsSelecteds[character]', JSON.stringify(optionsSelecteds[character]));
                  // console.log('->>> optionsSelecteds[character][action]', optionsSelecteds[character]?.[action]);

                  // const name = `${character}_${action}`;
                  // console.log('->>> optionsSelecteds[character]?.[action]', optionsSelecteds[character]?.[action]);

                  if (!optionsSelecteds[character]?.[action]) {
                    onChange(action, 'none', true);
                    return null;
                  }
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
