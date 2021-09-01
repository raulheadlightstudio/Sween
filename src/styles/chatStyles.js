import { StyleSheet } from 'react-native';

const chatMsgStyles = StyleSheet.create({
  msgContainer: {
    borderLeftColor: '#5DC7FE',
    borderLeftWidth: 2,
    paddingLeft: 10,
    marginBottom: 10,
  },
  msgContainerSend: {
    borderRightColor: 'red',
    borderRightWidth: 2,
    paddingRight: 10,
    marginBottom: 10,
  },
  msgAuthor: {
    fontFamily: 'Metropolis-Regular',
    color: '#5DC7FE',
    fontWeight: 'bold',
  },
  msgAuthorSend: {
    fontFamily: 'Metropolis-Regular',
    color: 'red',
    fontWeight: 'bold',
  },
  msgBody: { fontFamily: 'Metropolis-Regular', fontSize: 18 },
  msgImg: {
    height: 200,
    width: 200,
    borderRadius: 10,
  },
  assetsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#FFF',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 1,
  },
  textBox: { width: '75%' },
  textInput: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 25,
    height: '70%',
    paddingHorizontal: 10,
    fontFamily: 'Metropolis-Regular',
  },
  micContainer: { width: '10%' },
});

export { chatMsgStyles };
