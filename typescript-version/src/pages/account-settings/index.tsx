// ** React Imports
import { SyntheticEvent, useEffect, useState } from 'react';

// ** MUI Imports
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import MuiTab, { TabProps } from '@mui/material/Tab';

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline';
import InformationOutline from 'mdi-material-ui/InformationOutline';
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline';

// ** Demo Tabs Imports
import TabAccount from 'src/views/account-settings/TabAccount';
import TabSecurity from 'src/views/account-settings/TabSecurity';

// ** Third Party Styles Imports
import { CogOutline } from 'mdi-material-ui';
import 'react-datepicker/dist/react-datepicker.css';
import { Account } from 'src/@core/models/UserInfo.model';
import TabTransaction from 'src/views/account-settings/TabTransaction';
import TabRechargeHistory from 'src/views/account-settings/TabRechargeHistory';
import TabSystemConfig from 'src/views/account-settings/TabSystemConfig';

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}));

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const AccountSettings = () => {
  // Local Storage

  // ** State
  const [account, setAccount] = useState<Account>({ role: '', id: '', email: '', balance: 0 });
  const [value, setValue] = useState<string>('account');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('account') || '');
    if (data) {
      setAccount(data);
    }
  }, []);

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='account'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Thông tin tài khoản</TabName>
              </Box>
            }
          />
          <Tab
            value='security'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Đổi mật khẩu</TabName>
              </Box>
            }
          />
          {account.role == 'admin' ? (
            <Tab
              value='systemConfigs'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CogOutline />
                  <TabName>Cài đặt hệ thống</TabName>
                </Box>
              }
            />
          ) : (
            <Tab
              value='rechargeHistory'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <InformationOutline />
                  <TabName>Lịch sử nạp tiền</TabName>
                </Box>
              }
            />
          )}
          {account.role == 'admin' ? null : (
            <Tab
              value='payment'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <InformationOutline />
                  <TabName>Đã mua</TabName>
                </Box>
              }
            />
          )}
        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
          <TabAccount />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='security'>
          <TabSecurity />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='rechargeHistory'>
          <TabRechargeHistory />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='payment'>
          <TabTransaction />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='systemConfigs'>
          <TabSystemConfig />
        </TabPanel>
      </TabContext>
    </Card>
  );
};

export default AccountSettings;
