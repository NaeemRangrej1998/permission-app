import { enqueueSnackbar } from 'notistack';

const showNotification = (message, type, onClose) => {
  enqueueSnackbar(message, {
    variant: type || 'success',
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
    preventDuplicate: true,
    autoHideDuration: 3000,
    onClose: () => onClose && onClose(),
  });
};

export default showNotification;
