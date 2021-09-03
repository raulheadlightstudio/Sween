import { StyleSheet } from 'react-native';

const editPageStyles = StyleSheet.create({
  container: { backgroundColor: '#5DC7FE', flex: 1 },
  main: {
    height: '100%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 20,
  },
  scrollContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
  lastMsgTitle: {
    fontSize: 10,
    textAlign: 'center',
    fontFamily: 'Metropolis-Regular',
    color: '#9A9FA7',
    fontSize: 13,
  },
});

const editProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolTip: {
    fontFamily: 'Metropolis-Regular',
    textAlign: 'center',
    color: '#9A9FA7',
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  content: {
    borderTopColor: '#9A9FA7',
    borderBottomColor: '#9A9FA7',
    borderTopWidth: 0.25,
    borderBottomWidth: 0.25,
    padding: 10,
    fontFamily: 'Metropolis-Regular',
    fontSize: 20,
    fontWeight: 'bold',
  },
  privacyContainer: {
    borderTopColor: '#9A9FA7',
    borderBottomColor: '#9A9FA7',
    borderTopWidth: 0.25,
    borderBottomWidth: 0.25,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  privacyTitle: {
    fontFamily: 'Metropolis-Regular',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export { editPageStyles, editProfileStyles };
