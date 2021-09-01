import { StyleSheet } from 'react-native';

const listChatStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  imgContainer: { width: '20%' },
  img: { width: 65, height: 65, borderRadius: 50 },
  details: {
    width: '65%',
    display: 'flex',
    justifyContent: 'space-around',
  },
  userChat: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Metropolis-Regular',
  },
  textChat: {
    color: '#9A9FA7',
    fontWeight: 'bold',
    fontFamily: 'Metropolis-Regular',
    fontSize: 18,
  },
  timeContainer: {
    width: '15%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  time: {
    color: '#9A9FA7',
    fontWeight: 'bold',
    fontFamily: 'Metropolis-Regular',
    fontSize: 16,
  },
  counterContainer: {
    height: 20,
    width: 20,
    borderRadius: 25,
    backgroundColor: '#5DC7FE',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  counter: { color: '#FFF', fontFamily: 'Metropolis-Regular' },
});

export { listChatStyles };
