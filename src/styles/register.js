import {StyleSheet} from 'react-native';
import {alignContent, alignSelf, marginBottom} from 'styled-system';

const registerErrorStyles = StyleSheet.create({
  text: {
    color: '#721c24',
  },
});

const registerPhoneStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    marginTop: 100,
    paddingHorizontal: 50,
    height: '100%',
  },
  titles: {
    color: '#000',
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'Metropolis-Regular',
  },
  inputsContainer: {
    paddingVertical: 20,
  },
  inputsTitle: {
    color: '#9A9FA7',
    fontFamily: 'Metropolis-Regular',
  },
  inputs: {
    height: 40,
    borderBottomColor: '#9A9FA7',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingVertical: 10,
    paddingLeft: 70,
    fontFamily: 'Metropolis-Regular',
  },
  inputMask: {
    color: '#0EADFF',
    fontFamily: 'Metropolis-Regular',
    fontWeight: 'bold',
    fontSize: 20,
    position: 'absolute',
    top: 10,
  },
  tip: {
    fontSize: 15,
    fontFamily: 'Metropolis-Regular',
  },
});

const registerNameStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    marginTop: 30,
    paddingHorizontal: 50,
    height: '100%',
    alignContent: 'center',
  },
  titles: {
    color: '#000',
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'Metropolis-Regular',
  },
  inputsContainer: {
    paddingVertical: 20,
  },
  inputsTitle: {
    color: '#9A9FA7',
    fontFamily: 'Metropolis-Regular',
  },
  inputs: {
    height: 40,
    borderBottomColor: '#9A9FA7',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingVertical: 10,
    fontFamily: 'Metropolis-Regular',
  },
});

const registerBirthdayStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    marginTop: 100,
    paddingHorizontal: 50,
    height: '100%',
  },
  titles: {
    color: '#000',
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'Metropolis-Regular',
  },
  inputsContainer: {
    paddingVertical: 20,
  },
  inputsTitle: {
    color: '#9A9FA7',
    fontFamily: 'Metropolis-Regular',
  },
  inputs: {
    height: 40,
    borderBottomColor: '#9A9FA7',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingVertical: 10,
    fontFamily: 'Metropolis-Regular',
  },
});

const registerUsernameStyles = StyleSheet.create({
  tip: {
    color: '#9A9FA7',
    paddingHorizontal: 25,
    marginVertical: 10,
  },
});

const registerImgStyles = StyleSheet.create({
  cameraButton: {
    padding: 10,
    backgroundColor: '#EDEDED',
    borderRadius: 25,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    textAlign: 'center',
    color: '#9A9FA7',
    fontWeight: 'bold',
    fontFamily: 'Metropolis-Regular',
    marginBottom: 20,
  },
  scroll: {
    paddingHorizontal: 5,
  },
  imgContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imgs: {
    width: 130,
    height: 130,
    marginBottom: 5,
  },
  containerAvatar: {
    // backgroundColor: 'red',
    borderWidth: 3,
    borderColor: '#B0B4B9',
    borderRadius: 100, //?
    alignSelf: 'center',
    marginBottom: 20,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.36,
    // shadowRadius: 6.68,
    // elevation: 11,
  },
  avatarAccesory: {
    backgroundColor: '#0EADFF',
    position: 'absolute',
    right: 10,
    padding: 5,
    height: 40,
    width: 40,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 3.68,
    elevation: 5,
  },
  verifiedAccesory: {
    backgroundColor: '#0EADFF',
    position: 'absolute',
    // right: 10,
    // padding: 5,
    height: 15,
    width: 15,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 3.68,
    elevation: 5,
  },
  avatarAccesoryEdit: {
    backgroundColor: '#0EADFF',
    position: 'absolute',
    right: -5,
    padding: 5,
    height: 30,
    width: 30,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 3.68,
    elevation: 5,
  },
});

export {
  registerPhoneStyles,
  registerNameStyles,
  registerBirthdayStyles,
  registerUsernameStyles,
  registerImgStyles,
  registerErrorStyles,
};
