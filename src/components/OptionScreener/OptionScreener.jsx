import * as React from 'react';
import "./optionscreener.css";
import { Box, alpha, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Typography, Paper, Checkbox, IconButton, FormControlLabel, Switch, Menu, MenuItem, Button } from '@mui/material/';
import PropTypes from 'prop-types';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Popup from 'reactjs-popup';

function createData(name, price, strike, moneyness, expiration_date, dte, bid, midpoint, ask, last, volume, open_int, vol_io, iv, last_trade, links) {
    return {
        name,
        price,
        strike,
        moneyness,
        expiration_date,
        dte,
        bid,
        midpoint,
        ask,
        last,
        volume,
        open_int,
        vol_io,
        iv,
        last_trade,
        links

    };
}

function checkRating(expiration_date) {
    if (expiration_date === 'buy') {
        return <KeyboardArrowUpIcon style={{ verticalAlign: 'bottom', fontSize: 'xlarge' }}></KeyboardArrowUpIcon>
    }
    else {
        return <KeyboardArrowDownIcon style={{ verticalAlign: 'bottom', fontSize: 'xlarge' }}></KeyboardArrowDownIcon>
    }
}

function checkPercent(strike) {
    if (strike > 0) {
        return <h3 style={{ color: 'green', fontFamily: "'Roboto', 'Helvetica','Arial', sans-serif", fontWeight: '400', fontSize: '14px' }}>{strike}%</h3>
    }
    else if (strike < 0) {
        return <h3 style={{ color: 'red', fontFamily: "'Roboto', 'Helvetica','Arial', sans-serif", fontWeight: '400', fontSize: '14px' }}>{strike}%</h3>
    }
    else {
        return <h3 style={{ color: 'blue', fontFamily: "'Roboto', 'Helvetica','Arial', sans-serif", fontWeight: '400', fontSize: '14px' }}>{strike}%</h3>
    }
}

function checkChange(moneyness) {
    if (moneyness > 0) {
        return <h3 style={{ color: 'green', fontFamily: "'Roboto', 'Helvetica','Arial', sans-serif", fontWeight: '400', fontSize: '14px' }}>{moneyness}</h3>
    }
    else if (moneyness < 0) {
        return <h3 style={{ color: 'red', fontFamily: "'Roboto', 'Helvetica','Arial', sans-serif", fontWeight: '400', fontSize: '14px' }}>{moneyness}</h3>
    }
    else {
        return <h3 style={{ color: 'blue', fontFamily: "'Roboto', 'Helvetica','Arial', sans-serif", fontWeight: '400', fontSize: '14px' }}>{moneyness}</h3>
    }
}

const rows = [
    createData('AA', '30.20 Put', 28.00, -7.28, '09/15/23', 9, 0.12, 0.13, 0.14, 0.14, 463, 1245, 0.37, 44.45, '14:38 ET', ':'),
    createData('AA', '30.20 Call', 32.00, -5.96, '09/15/23', 9, 0.20, 0.22, 0.23, 0.21, 224, 666, 0.34, 41.24, '15:49 ET', ':'),
    createData('AA', '30.20 Call', 35.00, -15.89, '10/20/23', 44, 0.53, 0.55, 0.57, 0.56, 288, 7761, 0.04, 47.12, '15:59 ET', ':'),
    createData('AAL', '14.33 Put', 13.00, -9.28, '10/20/23', 44, 0.20, 0.21, 0.22, 0.20, 148, 15987, 0.01, 35.80, '15:53', ':'),
    createData('AAL', '14.33 Call', 17.00, -18.63, '10/20/23', 44, 0.07, 0.08, 0.08, 0.07, 821, 579, 1.42, 34.70, '15:53 ET', ':'),
    createData('AAL', '14.33 Call', 15.50,-8.16, '09/15/23', 9, 0.02, 0.03,71.47, 0.03, 672, 1257, 0.53, 32.15, '15:47 ET', ':'),
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
        label: 'Symbol',
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Price~ Type',
    },
    {
        id: 'strike',
        numeric: true,
        disablePadding: false,
        label: 'Strike',
    },
    {
        id: 'moneyness',
        numeric: true,
        disablePadding: false,
        label: 'Moneyness',
    },
    {
        id: 'expiration_date',
        numeric: false,
        disablePadding: false,
        label: 'Exp Date',
    },
    {
        id: 'dte',
        numeric: true,
        disablePadding: false,
        label: 'DTE',
    },
    {
        id: 'bid',
        numeric: true,
        disablePadding: false,
        label: 'Bid',
    },
    {
        id: 'midpoint',
        numeric: true,
        disablePadding: false,
        label: 'Midpoint',
    },
    {
        id: 'ask',
        numeric: true,
        disablePadding: false,
        label: 'Ask',
    },
    {
        id: 'last',
        numeric: true,
        disablePadding: false,
        label: 'Last',
    },
    {
        id: 'volume',
        numeric: true,
        disablePadding: false,
        label: 'Volume',
    },
    {
        id: 'open_int',
        numeric: true,
        disablePadding: false,
        label: 'Open Int',
    },
    {
        id: 'vol_io',
        numeric: true,
        disablePadding: false,
        label: 'Vol/OI',
    },
    {
        id: 'iv',
        numeric: true,
        disablePadding: false,
        label: 'IV',
    }, 
    {
        id: 'last_trade',
        numeric: false,
        disablePadding: false,
        label: 'Last Trade',
    },
    {
        id: 'links',
        numeric: false,
        disablePadding: false,
        label: 'Links',
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
            <Popup closeOnDocumentClick={false} trigger={<IconButton>
                <p className='screener-filter-text'>Filter</p>
                <FilterListIcon />
            </IconButton>}>
                <div className="screener-filter-menu">
                    <div className='screener-filter-menu-left'>
                        <div className='screener-filter-cat'>
                            <p className='screener-filter-text'>Placeholder</p>
                        </div>
                        <div className='screener-filter-cat'>
                            <p className='screener-filter-text'>Placeholder</p>
                        </div>
                        <div className='screener-filter-cat'>
                            <p className='screener-filter-text'>Placeholder</p>
                        </div>
                        <div className='screener-filter-cat'>
                            <p className='screener-filter-text'>Placeholder</p>
                        </div>
                        <div className='screener-filter-cat'>
                            <p className='screener-filter-text'>Placeholder</p>
                        </div>
                        <div className='screener-filter-cat'>
                            <p className='screener-filter-text'>Placeholder</p>
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
                                <p>Below <KeyboardArrowDownIcon style={{ verticalAlign: 'bottom', fontSize: 'xlarge' }} ></KeyboardArrowDownIcon></p>
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
                                <p>Below <KeyboardArrowDownIcon style={{ verticalAlign: 'bottom', fontSize: 'xlarge' }} ></KeyboardArrowDownIcon></p>
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
                                <p>Below <KeyboardArrowDownIcon style={{ verticalAlign: 'bottom', fontSize: 'xlarge' }} ></KeyboardArrowDownIcon></p>
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
                                <p>Below <KeyboardArrowDownIcon style={{ verticalAlign: 'bottom', fontSize: 'xlarge' }} ></KeyboardArrowDownIcon></p>
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
                                <p>Below <KeyboardArrowDownIcon style={{ verticalAlign: 'bottom', fontSize: 'xlarge' }} ></KeyboardArrowDownIcon></p>
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
                                <p>Below <KeyboardArrowDownIcon style={{ verticalAlign: 'bottom', fontSize: 'xlarge' }} ></KeyboardArrowDownIcon></p>
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
        <Box sx={{ width: '100%', overflowX: 'visible' }}>
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
                                        <TableCell align="center">{row.price}</TableCell>
                                        <TableCell align="center">{row.strike}</TableCell>
                                        {/*<TableCell align="center">{checkPercent(row.strike)}</TableCell>*/}
                                        <TableCell className="stock-screen-cell-class" id="stock-screen-cell" align="center">{checkChange(row.moneyness)}<p className='stock-screen-sm-text'>&nbsp;%</p></TableCell>
                                        {/*<TableCell align="center">{checkRating(row.expiration_date)} {row.expiration_date}</TableCell>*/}
                                        <TableCell align="center">{row.expiration_date}</TableCell>
                                        <TableCell align="center">{row.dte}</TableCell>
                                        <TableCell align="center">{row.bid}</TableCell>
                                        <TableCell align="center">{row.midpoint}</TableCell>
                                        <TableCell align="center">{row.ask}</TableCell>
                                        <TableCell align="center">{row.last}</TableCell>
                                        <TableCell align="center">{row.volume}</TableCell>
                                        <TableCell align="center">{row.open_int}</TableCell>
                                        <TableCell align="center">{row.vol_io}</TableCell>
                                        <TableCell align="center">{checkPercent(row.iv)}</TableCell>
                                        <TableCell align="center">{row.last_trade}</TableCell>
                                        <TableCell align="center">{row.links}</TableCell>
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

export default function OptionScreener() {
    return (
        <div className="screener-wrapper">
            <h1 className="screener-h1">Option Screener</h1>
            <Box sx={{ borderBottom: 1, width: "100%", marginBottom: "4%" }} />
            <div className="stock-list">
                <EnhancedTable />
            </div>
        </div>
    );
}