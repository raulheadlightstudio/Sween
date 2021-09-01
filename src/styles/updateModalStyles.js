import { StyleSheet } from 'react-native';

const updateModalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 150,
  },
  buttonOpen: {
    backgroundColor: '#2196F3',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: '#2196F3',
    fontFamily: 'Metropolis-Regular',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  modalText: {
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 18,
    fontFamily: 'Metropolis-Regular',
  },
  input: {
    height: 50,
    borderBottomColor: '#3da3f5',
    borderBottomWidth: 2,
    marginBottom: 20,
    paddingVertical: 10,
    fontSize: 18,
    fontFamily: 'Metropolis-Regular',
  },
  space: {
    marginHorizontal: 10,
  },
  centeredViewImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { updateModalStyles };
