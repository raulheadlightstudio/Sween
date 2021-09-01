import { StyleSheet } from 'react-native';

const headerStyles = {
  title: '',
  headerBackTitle: ' ',
  headerStyle: {
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
};

const headerButtonsStyles = StyleSheet.create({
  buttons: {
    paddingHorizontal: 10,
  },
});

export { headerButtonsStyles, headerStyles };
