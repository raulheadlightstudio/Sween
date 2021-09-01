import { StyleSheet } from 'react-native';

const homeHeaderStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 100,
    backgroundColor: '#5DC7FE',
    paddingBottom: 10,
  },
  asides: {
    width: '25%',
  },
  center: {
    width: '40%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  imgContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  icon: { width: 30, height: 30 },
});

const chatHeaderStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 100,
    backgroundColor: '#5DC7FE',
    paddingBottom: 10,
  },
  imgAside: {
    width: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 2,
    display: 'flex',
    justifyContent: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  center: {
    width: '60%',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    fontFamily: 'Metropolis-Regular',
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconContainer: {
    width: '10%',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  iconRightContainer: {
    width: '10%',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const editProfileHeaderStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 100,
    backgroundColor: '#FFF',
    paddingBottom: 10,
  },
  left: {
    width: '15%',
    position: 'absolute',
    left: '2.5%',
    bottom: '25%',
    zIndex: 10,
  },
  center: {
    width: '100%',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Metropolis-Regular',
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export { chatHeaderStyles, homeHeaderStyles, editProfileHeaderStyles };
