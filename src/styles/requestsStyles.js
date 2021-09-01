import { StyleSheet } from 'react-native';

const requestsStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    marginBottom: 20,
  },
  requestContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  imgContainer: {
    width: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgRequest: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  requestInfoContainer: {
    width: '50%',
    paddingHorizontal: 10,
  },
  requestName: {
    fontFamily: 'Metropolis-Regular',
    fontWeight: 'bold',
    fontSize: 20,
  },
  requestUsername: {
    fontFamily: 'Metropolis-Regular',
    color: '#9A9FA7',
  },
  actionsContainer: {
    width: '35%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  actionsBlock: {
    width: '35%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 20,
  },
  add: {
    backgroundColor: '#0EADFF',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
  },
  addText: {
    fontFamily: 'Metropolis-Regular',
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  delete: {
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 50,
  },
});

export { requestsStyles };
