import * as React from 'react';
import "./stock-screener/stock-screener.css";
import {Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Paper, Checkbox, FormControlLabel, Switch} from '@mui/material/';
import PropTypes from 'prop-types';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
        label: 'Company Name',
        },
        {
        id: 'ticker',
        numeric: true,
        disablePadding: false,
        label: 'Ticker',
        },
        {
        id: 'marketValue',
        numeric: true,
        disablePadding: false,
        label: 'Value',
        },
        {
        id: 'weight',
        numeric: true,
        disablePadding: false,
        label: 'Weight',
        },
        {
        id: 'notationalValue',
        numeric: false,
        disablePadding: false,
        label: 'Notational Value',
        },
        {
        id: 'sector',
        numeric: true,
        disablePadding: false,
        label: 'Sector',
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
    
    
    
    export function EnhancedTable({item}) {
        
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
            const newSelected = item.map((n) => n.name);
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
          page > 0 ? Math.max(0, (1 + page) * rowsPerPage - item.length) : 0;
      
        const visibleRows = React.useMemo(
          () =>
            stableSort(item, getComparator(order, orderBy)).slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage,
            ),
            [order, orderBy, page, rowsPerPage],
        );
    
        function FilterMenu() {
            const [show, setShow] = React.useState(false);
            const handleShow = () => {
              setShow(!show);
            };
    
            return(
                <div>
                    <Button sx={{borderColor: "gray", color: "gray", '&:hover': {backgroundColor: "white", color: "gray"}, boxShadow: "none", border: "1px solid",backgroundColor: "white"}} variant="contained" onClick={handleShow} >Filter<FilterListIcon /></Button>
                    {
                        show &&
                        <div className='filterMenu'>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                label="Age"
                            >
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    }
                </div>
            )
        }
      
        return (
          <Box sx={{ width: '100%', overflowX: 'visible'}}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <TableContainer>
              <FilterMenu></FilterMenu>
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
                    rowCount={item.length}
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
                          </TableCell> {/*name, ticker, marketValue, weight, notationalValue, sector */}
                          {/* <TableCell className="stock-screen-cell-class" id="stock-screen-cell" align="center"><h3 style={{fontFamily:"'Roboto', 'Helvetica', 'Arial', sans-serif", fontWeight:"400", fontSize:'14px'}}>{row.price}</h3> <p className='stock-screen-sm-text'>&nbsp;USD</p></TableCell>
                          <TableCell align="center">{checkPercent(row.chg_percent)}</TableCell>
                          <TableCell className="stock-screen-cell-class" id="stock-screen-cell" align="center">{checkChange(row.chg)}<p className='stock-screen-sm-text'>&nbsp;USD</p></TableCell>
                          <TableCell align="center">{checkRating(row.tech_rating)} {row.tech_rating}</TableCell> */}
                          <TableCell align="center">{row.ticker}</TableCell>
                          <TableCell align="center">{row.marketValue}</TableCell>
                          <TableCell align="center">{row.weight}</TableCell>
                          <TableCell align="center">{row.notationalValue}</TableCell>
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
                    count={item.length}
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