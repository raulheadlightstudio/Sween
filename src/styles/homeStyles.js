import { StyleSheet } from 'react-native';

const homeStyles = StyleSheet.create({
  main: { backgroundColor: '#5DC7FE', flex: 1 },
  container: {
    backgroundColor: '#FFF',
    height: '100%',
    paddingBottom: 10,
  },
  scroll: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    paddingBottom: 20,
  },
  padding: {
    padding: 10,
  },
  messageBadgeText: {
    fontFamily: 'Metropolis-Regular',
    fontSize: 12,
    color: '#F0F2F4',
    fontWeight: 'bold',
  },
  messageBadgeContainer: {
    backgroundColor: '#0EADFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  messageTime: {
    fontFamily: 'Metropolis-Regular',
    fontSize: 14,
    color: 'gray',
  },
  messageTimeContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  listItemSubtitle: { fontFamily: 'Metropolis-Regular' },
  listItemSubtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    width: '100%',
  },
  listItemTitle: {
    fontFamily: 'Metropolis-Regular',
  },
});

export { homeStyles };
