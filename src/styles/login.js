import {StyleSheet} from 'react-native';

const loginStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 50,
  },
  titles: {
    color: '#9A9FA7',
    fontFamily: 'Metropolis-Regular',
  },
  title: {
    color: '#000000',
    fontFamily: 'Metropolis-Regular',
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: -50,
  },
  title2: {
    color: '#000000',
    fontFamily: 'Metropolis-Regular',
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: -100,
  },
  tit: {
    color: '#9A9FA7',
    fontFamily: 'Metropolis-Regular',
    textAlign: 'center',
    marginBottom: 100,
  },
  tit2: {
    color: '#9A9FA7',
    fontFamily: 'Metropolis-Regular',
    textAlign: 'center',
    marginBottom: 150,
  },
  inputsContainer: {
    marginTop: 100,
  },
  inputs: {
    height: 50,
    borderBottomColor: '#9A9FA7',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingVertical: 10,
    fontSize: 20,
    marginTop: 12,
    fontFamily: 'Metropolis-Regular',
  },
  button: {
    marginVertical: 10,
    color: '#0EADFF',
    fontFamily: 'Metropolis-Regular',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
  showHide: {
    position: 'absolute',
    top: '12.5%',
    right: '10%',
  },
  showHideIcon: {
    color: '#FFF',
  },
  logIn: {
    backgroundColor: '#0EADFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 50,
    // top: 35,
  },
  shadowButton: {
    borderRadius: 100,
    top: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  Verify: {
    backgroundColor: '#0EADFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 50,
    marginTop: 80,
  },
  logInText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontFamily: 'Metropolis-Regular',
  },
});
export {loginStyles};
