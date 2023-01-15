// ** MUI Imports
import {
  Backdrop,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AccountTikTok } from 'src/@core/models/AccountTikTok.model';

// ** Demo Components Imports
import CardAppleWatch from 'src/views/cards/CardAppleWatch';

const Product = () => {
  const [listAccounts, setlistAccounts] = useState<Array<AccountTikTok>>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [change, setChange] = useState<boolean>(true);

  const [exchangeRate, setExchangRate] = useState(0);
  const [discountForColaborator, setDiscountForColaborator] = useState(0);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage] = useState(12);
  const [totalPage, setTotalPage] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    async function fetch() {
      const url = `${process.env.apiUrl}/api/configs`;
      const res = await axios.get(url);
      setExchangRate(res.data.exchangeRate);
      setDiscountForColaborator(res.data.discountForColaborator);
    }

    fetch();

    const token = localStorage.getItem('token') || '';
    const url = `${process.env.apiUrl}/api/tiktokAccount/listTiktokAccountCoin`;
    let params: { limit: number; offset: number; filter?: string } = {
      limit: rowsPerPage,
      offset: (page - 1) * rowsPerPage
    };
    if (valueSortCoin) {
      let filter;
      switch (valueSortCoin) {
        case '1':
          filter = JSON.stringify([{ operator: 'between', value: '[0, 1000]', prop: 'tiktokCoin' }]);
          params = { ...params, filter };
          break;
        case '2':
          filter = JSON.stringify([{ operator: 'between', value: '[1000, 2000]', prop: 'tiktokCoin' }]);
          params = { ...params, filter };
          break;
        case '3':
          filter = JSON.stringify([{ operator: 'between', value: '[1000, 2000]', prop: 'tiktokCoin' }]);
          params = { ...params, filter };
          break;
        case '4':
          filter = JSON.stringify([{ operator: 'between', value: '[5000]', prop: 'tiktokCoin' }]);
          params = { ...params, filter };
          break;
      }
    }
    const config = {
      params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    axios
      .get(url, config)
      .then(res => {
        setLoading(false);
        setlistAccounts(res.data.rows);
        setCount(res.data.count);
        const totalPage = Math.floor(count / rowsPerPage) + 1;
        setTotalPage(totalPage);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [change]);

  const handleClose = () => {
    return;
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setChange(!change);
  };

  const [valueSortCoin, setValueSortCoin] = useState('');

  const handleChangeSortCoin = (event: SelectChangeEvent) => {
    setValueSortCoin(event.target.value as string);
    setChange(!change);
  };

  return count === undefined ? (
    <Grid>Hiện tại chưa có sản phẩm nào</Grid>
  ) : (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h6'>{'Danh sách tài khoản Tiktok'}</Typography>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* <Box sx={{ minWidth: 120 }}>
          <FormControl size='small'>
            <InputLabel id='demo-simple-select-label'>Sắp xếp xu</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={valueSortCoin}
              label='Sắp xếp xu'
              onChange={handleChangeSortCoin}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={'1'}>Từ 0 xu đến 1000 xu</MenuItem>
              <MenuItem value={'2'}>Từ 1000 xu đến 2000 xu</MenuItem>
              <MenuItem value={'3'}>Từ 2000 xu đến 5000 xu</MenuItem>
              <MenuItem value={'4'}>Lớn hơn 5000 xu</MenuItem>
            </Select>
          </FormControl>
        </Box> */}
        <Pagination count={totalPage} page={page} onChange={handleChangePage} />
      </Grid>
      {listAccounts.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <CardAppleWatch
            data={item}
            exchangeRate={exchangeRate}
            discountForColaborator={discountForColaborator}
            setChange={setChange}
            change={change}
          />
        </Grid>
      ))}
      <Grid item xs={12} sx={{ justifyContent: 'space-between' }}>
        <Pagination count={totalPage} page={page} onChange={handleChangePage} />
      </Grid>
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading} onClick={handleClose}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </Grid>
  );
};

export default Product;
