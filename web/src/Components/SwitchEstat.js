import { Switch } from 'react-native-switch';
import React from 'react';
import "../SwitchEstat.css"

function SwitchEstat() {

  return (
    <Switch
    value={true}
    onValueChange={(val) => console.log(val)}
    disabled={false}
    activeText={'On'}
    inActiveText={'Off'}
    backgroundActive={'green'}
    backgroundInactive={'gray'}
    circleActiveColor={'#30a566'}
    circleInActiveColor={'#000000'}/>
  );
}

export default SwitchEstat;