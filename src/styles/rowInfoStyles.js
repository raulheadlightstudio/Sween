import { StyleSheet } from 'react-native';

const rowInfoStyles = StyleSheet.create({
  container: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontFamily: 'Metropolis-Regular',
    fontSize: 20,
    fontWeight: 'bold',
  },
  badgeContainer: {
    backgroundColor: '#0EADFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 25,
    height: 25,
  },
  badge: {
    fontFamily: 'Metropolis-Regular',
    fontSize: 16,
    color: '#F0F2F4',
    fontWeight: 'bold',
  },
  link: {
    fontFamily: 'Metropolis-Regular',
    fontSize: 16,
    color: '#9A9FA7',
  },
});

export { rowInfoStyles };
