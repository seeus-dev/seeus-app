import { StyleSheet } from 'react-native';
import baseStyle from '../../styles/base';
import colors, { theme } from '../../styles/colors';

export default StyleSheet.create({
  container: {
    ...baseStyle.container,
    backgroundColor: theme.primary,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 40,
    padding: 20,
  },
  titleText: {
    ...baseStyle.text,
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff',
  },
  subTitleText: {
    ...baseStyle.text,
    fontSize: 35,
    color: '#fff',
    marginTop: 10,
  },
  inputContainer: {
    marginTop: 40,
    paddingRight: 10,
    backgroundColor: theme.primaryLighter,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  input: {
    minWidth: 0,
    paddingVertical: 20,
    paddingLeft: 15,
    paddingRight: 5,
    marginRight: 0,
    flex: 1,
    color: '#fff',
    fontSize: 30,
    backgroundColor: null,
  },
  inputStaticText: {
    fontSize: 30,
    color: '#fff',
    opacity: 0.6,
  },
  positiveButton: {
    backgroundColor: colors.seeusYellow,
    justifyContent: 'space-around',
  },
  positiveButtonLabel: {
    fontWeight: 'bold',
  },
  negativeButton: {
    backgroundColor: null,
    paddingLeft: 5,
    justifyContent: 'flex-start',
  },
  negativeButtonLabel: {
    color: '#fff',
  },
});
