import * as React from 'react';
import "./stock-screener.css";
import {Box, alpha, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Typography, Paper, Checkbox, IconButton, FormControlLabel, Switch, Menu, MenuItem, Button} from '@mui/material/';
import PropTypes from 'prop-types';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Popup from 'reactjs-popup';
import BarChart from '../barChart/barChart';

function createData(name, price, chg_percent, chg, tech_rating, vol, vol_price, mkt_cap, pe, eps, employees, sector) {
    return {
        name,
        price,
        chg_percent,
        chg,
        tech_rating,
        vol,
        vol_price,
        mkt_cap,
        pe,
        eps,
        employees,
        sector
        
    };
}

function checkRating(tech_rating) {
    if (tech_rating === 'buy') {
        return <KeyboardArrowUpIcon style={{verticalAlign: 'bottom', fontSize: 'xlarge'}}></KeyboardArrowUpIcon>
    }
    else {
        return <KeyboardArrowDownIcon style={{verticalAlign: 'bottom', fontSize: 'xlarge'}}></KeyboardArrowDownIcon>
    }
}

function checkPercent(chg_percent) {
    if(chg_percent > 0) {
        return <h3 style={{color: 'green', fontFamily: "'Roboto', 'Helvetica','Arial', sans-serif", fontWeight: '400', fontSize: '14px'}}>{chg_percent}%</h3>
    }
    else if(chg_percent < 0) {
        return <h3 style={{color: 'red', fontFamily: "'Roboto', 'Helvetica','Arial', sans-serif", fontWeight: '400', fontSize: '14px'}}>{chg_percent}%</h3>
    }
    else {
        return <h3 style={{color: 'blue', fontFamily: "'Roboto', 'Helvetica','Arial', sans-serif", fontWeight: '400', fontSize: '14px'}}>{chg_percent}%</h3>
    }
}

function checkChange(chg) {
    if(chg > 0) {
        return <h3 style={{color: 'green', fontFamily: "'Roboto', 'Helvetica','Arial', sans-serif", fontWeight: '400', fontSize: '14px'}}>{chg}</h3>
    }
    else if (chg < 0) {
        return <h3 style={{color: 'red', fontFamily: "'Roboto', 'Helvetica','Arial', sans-serif", fontWeight: '400', fontSize: '14px'}}>{chg}</h3>
    }
    else {
        return <h3 style={{color: 'blue', fontFamily: "'Roboto', 'Helvetica','Arial', sans-serif", fontWeight: '400', fontSize: '14px'}}>{chg}</h3>
    }
}

const rows = [
createData('Apple Inc', 182.91, -3.58, -6.79, 'sell', 81.174, 14.848, 2.86, 30.74, 5.898, 164, 'Electronic Technology'),
createData('Microsoft Corp', 332.88, 1.1, 0.67, 'buy', 17.351, 5.776, 2.473, 34.37,9.72, 221, 'Technology Services'),
createData('Alphabet Inc', 135.37, 0, 0, 'buy', 15.706, 2.126, 1.701, 28.64, 4.75, 190.234, 'Technology Services'),
createData('Amazon.com Inc', 135.36, -1.39, -1.91, 'buy', 39.359, 5.328, 1.389, 107.64, 1.27, 1.541, 'Retail Trade'),
createData('Nvidia corp', 470.61, -3.06, -14.87, 'buy', 46.732, 21.988, 1.162, 113.68, 4.18, 26.98, 'Electronic Tech'),
createData('Tesla', 251.92, -1.78,-4.57, 'buy', 116.543, 29.36, 799.593,71.47, 3.87, 127.855, 'Consumer Durables'),
];

function descendingComparator(a, b, orderBy) {
if (b[orderBy] < a[orderBy]) {
    return -1;
}
if (b[orderBy] > a[orderBy]) {
    return 1;
}
return 0;
}

function getComparator(order, orderBy) {
return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
  
function stableSort(array, comparator) {
const stabilizedThis = array.map((el, index) => [el, index]);
stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
    return order;
    }
    return a[1] - b[1];
});
return stabilizedThis.map((el) => el[0]);
}
  
const headCells = [
    {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'TICKER',
    },
    {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'PRICE',
    },
    {
    id: 'chg_percent',
    numeric: true,
    disablePadding: false,
    label: 'CHG%',
    },
    {
    id: 'chg',
    numeric: true,
    disablePadding: false,
    label: 'CHG',
    },
    {
    id: 'tech_rating',
    numeric: false,
    disablePadding: false,
    label: 'TECHNICAL_RATING',
    },
    {
    id: 'vol',
    numeric: true,
    disablePadding: false,
    label: 'VOL',
    },
    {
    id: 'vol_price',
    numeric: true,
    disablePadding: false,
    label: 'VOLUME*PRICE',
    },
    {
    id: 'mkt_cap',
    numeric: true,
    disablePadding: false,
    label: 'MKT_CAP',
    },
    {
    id: 'pe',
    numeric: true,
    disablePadding: false,
    label: 'P/E',
    },
    {
    id: 'eps',
    numeric: true,
    disablePadding: false,
    label: 'EPS (TTM)',
    },
    {
    id: 'employees',
    numeric: true,
    disablePadding: false,
    label: 'EMPLOYEES',
    },
    {
    id: 'sector',
    numeric: false,
    disablePadding: false,
    label: 'SECTOR',
    },
];

function EnhancedTableHead(props) {
const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
};

return (
    <TableHead>
        <TableRow>
            <TableCell padding='checkbox'>
                <Checkbox 
                    color="primary"
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={rowCount > 0 && numSelected === rowCount}
                    onChange={onSelectAllClick}
                    inputProps={{
                    'aria-label': 'select all',
                    }}
                />
            </TableCell>
            {headCells.map((headCell) => (
                <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'center' : 'center'}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === headCell.id ? order : false}
                >
                    <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                    >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                            <Box component="span" sx={visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                        ) : null}
                    </TableSortLabel>
                </TableCell>
            ))}
        </TableRow>
    </TableHead>
);
}

EnhancedTableHead.propTypes = {
numSelected: PropTypes.number.isRequired,
onRequestSort: PropTypes.func.isRequired,
onSelectAllClick: PropTypes.func.isRequired,
order: PropTypes.oneOf(['asc', 'desc']).isRequired,
orderBy: PropTypes.string.isRequired,
rowCount: PropTypes.number.isRequired,
};

//Filter Logic
function EnhancedTableToolbar(props) {

    const [anchorElDropdown, setAnchorElDropdown] = React.useState(null);
    const open = Boolean(anchorElDropdown);
    const handleDropdownClick = (dropDownevent) => {
        setAnchorElDropdown(dropDownevent.currentTarget);
    };
    const handleDropdownClose = () => {
        setAnchorElDropdown(null);
    };    
const { numSelected } = props;

    return (
        <Toolbar
        sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
            bgcolor: (theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
        }}
        >
        {numSelected > 0 ? (
            <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
            >
            {numSelected} selected
            </Typography>
        ) : (
            <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
            >
            </Typography>
        )}
            <Popup closeOnDocumentClick = {false} trigger={<IconButton>
                <p className='screener-filter-text'>Filter</p>
                <FilterListIcon />
                </IconButton>}>
                <div className="screener-filter-menu">
                    <div className='screener-filter-menu-left'>
                        <div className='screener-filter-cat'>
                            <p className='screener-filter-text'>Price to Earnings Ratio (TTM)</p>
                        </div>
                        <div className='screener-filter-cat'>
                            <p className='screener-filter-text'>Return on Assets (TTM)</p>
                        </div>
                        <div className='screener-filter-cat'>
                            <p className='screener-filter-text'>Debt to Equity Ratio (MRQ)</p>
                        </div>
                        <div className='screener-filter-cat'>
                            <p className='screener-filter-text'>Quick Ratio (MRQ)</p>
                        </div>
                        <div className='screener-filter-cat'>
                            <p className='screener-filter-text'>Price to Book (FY)</p>
                        </div>
                        <div className='screener-filter-cat'>
                            <p className='screener-filter-text'>Operating Margin (TTM)</p>
                        </div>
                    </div>
                    <div className='screener-filter-menu-right'>
                        <div className='screener-filter-menu-btn'>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleDropdownClick}
                            >
                                <p>Below <KeyboardArrowDownIcon style={{verticalAlign: 'bottom', fontSize: 'xlarge'}} ></KeyboardArrowDownIcon></p>
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorElDropdown={anchorElDropdown}
                                open={open}
                                onClose={handleDropdownClose}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleDropdownClose}>Profile</MenuItem>
                                <MenuItem onClick={handleDropdownClose}>My account</MenuItem>
                                <MenuItem onClick={handleDropdownClose}>Logout</MenuItem>
                            </Menu>
                        </div>
                        <div className='screener-filter-menu-btn'>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleDropdownClick}
                            >
                                <p>Below <KeyboardArrowDownIcon style={{verticalAlign: 'bottom', fontSize: 'xlarge'}} ></KeyboardArrowDownIcon></p>
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorElDropdown={anchorElDropdown}
                                open={open}
                                onClose={handleDropdownClose}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleDropdownClose}>Profile</MenuItem>
                                <MenuItem onClick={handleDropdownClose}>My account</MenuItem>
                                <MenuItem onClick={handleDropdownClose}>Logout</MenuItem>
                            </Menu>
                        </div>
                        <div className='screener-filter-menu-btn'>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleDropdownClick}
                            >
                                <p>Below <KeyboardArrowDownIcon style={{verticalAlign: 'bottom', fontSize: 'xlarge'}} ></KeyboardArrowDownIcon></p>
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorElDropdown={anchorElDropdown}
                                open={open}
                                onClose={handleDropdownClose}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleDropdownClose}>Profile</MenuItem>
                                <MenuItem onClick={handleDropdownClose}>My account</MenuItem>
                                <MenuItem onClick={handleDropdownClose}>Logout</MenuItem>
                            </Menu>
                        </div>
                        <div className='screener-filter-menu-btn'>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleDropdownClick}
                            >
                                <p>Below <KeyboardArrowDownIcon style={{verticalAlign: 'bottom', fontSize: 'xlarge'}} ></KeyboardArrowDownIcon></p>
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorElDropdown={anchorElDropdown}
                                open={open}
                                onClose={handleDropdownClose}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleDropdownClose}>Profile</MenuItem>
                                <MenuItem onClick={handleDropdownClose}>My account</MenuItem>
                                <MenuItem onClick={handleDropdownClose}>Logout</MenuItem>
                            </Menu>
                        </div>
                        <div className='screener-filter-menu-btn'>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleDropdownClick}
                            >
                                <p>Below <KeyboardArrowDownIcon style={{verticalAlign: 'bottom', fontSize: 'xlarge'}} ></KeyboardArrowDownIcon></p>
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorElDropdown={anchorElDropdown}
                                open={open}
                                onClose={handleDropdownClose}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleDropdownClose}>Profile</MenuItem>
                                <MenuItem onClick={handleDropdownClose}>My account</MenuItem>
                                <MenuItem onClick={handleDropdownClose}>Logout</MenuItem>
                            </Menu>
                        </div>
                        <div className='screener-filter-menu-btn'>
                                <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleDropdownClick}
                                >
                                    <p>Below <KeyboardArrowDownIcon style={{verticalAlign: 'bottom', fontSize: 'xlarge'}} ></KeyboardArrowDownIcon></p>
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorElDropdown={anchorElDropdown}
                                    open={open}
                                    onClose={handleDropdownClose}
                                    MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handleDropdownClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleDropdownClose}>My account</MenuItem>
                                    <MenuItem onClick={handleDropdownClose}>Logout</MenuItem>
                                </Menu>
                            </div>
                    </div>
                </div>
            </Popup>
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export function EnhancedTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelected = rows.map((n) => n.name);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };
  
    const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      setSelected(newSelected);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleChangeDense = (event) => {
      setDense(event.target.checked);
    };
  
    const isSelected = (name) => selected.indexOf(name) !== -1;
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  
    const visibleRows = React.useMemo(
      () =>
        stableSort(rows, getComparator(order, orderBy)).slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage,
        ),
      [order, orderBy, page, rowsPerPage],
    );
  
    return (
      <Box sx={{ width: '100%', overflowX: 'visible'}}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
  
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell className="stock-screen-cell-class" id="stock-screen-cell" align="center">{row.price} <p className='stock-screen-sm-text'>&nbsp;USD</p></TableCell>
                      <TableCell align="center">{checkPercent(row.chg_percent)}</TableCell>
                      <TableCell className="stock-screen-cell-class" id="stock-screen-cell" align="center">{checkChange(row.chg)}<p className='stock-screen-sm-text'>&nbsp;USD</p></TableCell>
                      <TableCell align="center">{checkRating(row.tech_rating)} {row.tech_rating}</TableCell>
                      <TableCell align="center">{row.vol}</TableCell>
                      <TableCell align="center">{row.vol_price}</TableCell>
                      <TableCell align="center">{row.mkt_cap}</TableCell>
                      <TableCell align="center">{row.pe}</TableCell>
                      <TableCell align="center">{row.eps}</TableCell>
                      <TableCell align="center">{row.employees}</TableCell>
                      <TableCell align="center">{row.sector}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
        </TableContainer>
        <div className='table-footer'>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
            />
        </div>
        </Paper>
      </Box>
    );
  }

export default function Stock_screener() {
    return (
        <div className="screener-wrapper">
            <h1 className="screener-h1">Stock Screener</h1>
			<div className='barCharts'>
				<BarChart
					data={rows}
					width={450}
					height={300}
					property='chg_percent'
				/>
				<BarChart
					data={rows}
					width={450}
					height={300}
					property='vol'
				/>
				<BarChart
					data={rows}
					width={450}
					height={300}
					property='employees'
				/>
			</div>
            <Box sx={{borderBottom: 1, width: "100%", marginBottom: "4%"}}/>
            <div className="stock-list">
                <EnhancedTable/>
            </div>
        </div>
    );
}