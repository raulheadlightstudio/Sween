import { StyleSheet } from 'react-native';

const cameraViewStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonsContainer: {
    marginBottom: 25,
    display: 'flex',
    flexDirection: 'row',
  },
  buttonsView: {
    width: '33%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    fontFamily: 'Metropolis-Regular',
    fontSize: 25,
    color: '#FFF',
  },
  takePictureOut: {
    backgroundColor: '#FFF',
    height: 75,
    width: 75,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  takePictureIn: {
    borderWidth: 3,
    borderRadius: 50,
    height: 65,
    width: 65,
  },
});

const cameraPreviewStyles = StyleSheet.create({
  previewContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  imgBck: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  previewButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 50,
  },
  previewTextButtons: {
    color: '#FFF',
    fontSize: 25,
    fontFamily: 'Metropolis-Regular',
  },
});

export { cameraViewStyles, cameraPreviewStyles };
