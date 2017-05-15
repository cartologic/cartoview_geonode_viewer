import {cyan900, lightBlack, pinkA200, grey100, grey500, darkBlack, white, lime100, grey300, cyan500,lightBlue600,lightBlueA100,blue900,lime50,cyan50,black,cyanA400,teal500} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import zIndex from 'material-ui/styles/zIndex';
import spacing from 'material-ui/styles/spacing';

export default {
  spacing: spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: teal500,
    primary2Color: cyan900,
    primary3Color: lightBlack,
    accent1Color: pinkA200,
    accent2Color: black,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
  }
};
