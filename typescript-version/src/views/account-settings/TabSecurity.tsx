// ** React Imports
import { ChangeEvent, MouseEvent, useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline';
import KeyOutline from 'mdi-material-ui/KeyOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline';
import { Backdrop, CircularProgress, FormHelperText, Snackbar, TextField } from '@mui/material';
import axios from 'axios';

interface State {
  newPassword: string;
  currentPassword: string;
  showNewPassword: boolean;
  confirmNewPassword: string;
  showCurrentPassword: boolean;
  showConfirmNewPassword: boolean;
}

const TabSecurity = () => {
  // ** States
  const [values, setValues] = useState<State>({
    newPassword: '',
    currentPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showCurrentPassword: false,
    showConfirmNewPassword: false
  });

  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [messageToast, setMessageToast] = useState('');
  const [openToast, setOpenToast] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const handleCloseLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  // Handle Current Password
  const handleCurrentPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword });
  };
  const handleMouseDownCurrentPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // Handle New Password
  const handleNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
    if (event.target.value !== values.confirmNewPassword) {
      setError(true);
      setMessageError('Mật khẩu mới không khớp');
    } else {
      setError(false);
      setMessageError('');
    }
  };

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword });
  };
  const handleMouseDownNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
    if (event.target.value !== values.newPassword) {
      setError(true);
      setMessageError('Mật khẩu mới không khớp');
    } else {
      setError(false);
      setMessageError('');
    }
  };
  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword });
  };
  const handleMouseDownConfirmNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleCloseToast = () => {
    setTimeout(() => {
      setOpenToast(false);
    }, 2000);
  };

  const handleSubmitChangePassword = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const url = 'http://localhost:5001/api/auth/changePassword';
    await axios
      .put(
        url,
        { currentPassword: values.currentPassword, newPassword: values.newPassword },
        {
          headers: {
            authorization: 'Bearer ' + token
          }
        }
      )
      .then(() => {
        setMessageToast('Đổi mật khẩu thành công !!');
        setOpenToast(true);
        handleCloseToast();
      })
      .catch(({ response }) => {
        if (response && response.data?.code == 28) {
          setMessageToast('Mật khẩu hiện tại không đúng');
          setOpenToast(true);
          handleCloseToast();

          return true;
        }
        setMessageToast('Đã có lỗi xảy ra');
        setOpenToast(true);
        handleCloseToast();

        return true;
      });
    handleCloseLoading();
  };

  return (
    <form>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-current-password'>Mật khẩu hiện tại</InputLabel>
                  <OutlinedInput
                    label='Mật khẩu hiện tại'
                    value={values.currentPassword}
                    id='account-settings-current-password'
                    type={values.showCurrentPassword ? 'text' : 'password'}
                    onChange={handleCurrentPasswordChange('currentPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowCurrentPassword}
                          onMouseDown={handleMouseDownCurrentPassword}
                        >
                          {values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-new-password'>Mật khẩu mới</InputLabel>
                  <OutlinedInput
                    error={error}
                    label='Mật khẩu mới'
                    value={values.newPassword}
                    id='account-settings-new-password'
                    onChange={handleNewPasswordChange('newPassword')}
                    type={values.showNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowNewPassword}
                          aria-label='toggle password visibility'
                          onMouseDown={handleMouseDownNewPassword}
                        >
                          {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-confirm-new-password'>Nhập lại mật khẩu</InputLabel>
                  <OutlinedInput
                    error={error}
                    label='Nhập lại mật khẩu'
                    value={values.confirmNewPassword}
                    id='account-settings-confirm-new-password'
                    type={values.showConfirmNewPassword ? 'text' : 'password'}
                    onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowConfirmNewPassword}
                          onMouseDown={handleMouseDownConfirmNewPassword}
                        >
                          {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText error>{messageError}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 3, marginBottom: 8 }}>
          <Button variant='contained' sx={{ marginRight: 2 }} onClick={handleSubmitChangePassword}>
            Lưu thay đổi
          </Button>
          <Button
            type='reset'
            variant='outlined'
            color='secondary'
            onClick={() => setValues({ ...values, currentPassword: '', newPassword: '', confirmNewPassword: '' })}
          >
            Đặt lại
          </Button>
        </Box>
      </CardContent>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={openToast}
        onClose={handleCloseToast}
        message={messageToast}
        key={'top' + 'right'}
      />
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </form>
  );
};
export default TabSecurity;
