import * as React from 'react';
import PropTypes from 'prop-types';
import { createTheme, useTheme } from '@mui/material/styles';
import {Box,Table,TableBody,TableCell,TableContainer,TableFooter,TablePagination,TableRow,Paper,IconButton,TableHead} from '@mui/material';
import {AiOutlineLeft,AiOutlineRight,AiOutlineVerticalLeft,AiOutlineVerticalRight} from "react-icons/ai"
import "./table.css"
// import { ThemeProvider } from "@material-ui/styles";


function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <AiOutlineVerticalLeft /> : <AiOutlineVerticalRight />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <AiOutlineRight /> : <AiOutlineLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <AiOutlineLeft /> : <AiOutlineRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <AiOutlineVerticalRight /> : <AiOutlineVerticalLeft />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};



export default function CustomTable({rows,header,rowsPerPage,page,setPage,setRowsPerPage,tableContent,ref}) {
 

  // Avoid a layout jump when reaching the last page with empty rows.
 
  const tableTheme = createTheme({
    overrides: {
      MuiTablePagination: {
        spacer: {
          flex: 'none'
        }
      }
    }
  });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} >
   <TableContainer sx={{ maxHeight: 460 }} >
     
     <Table style={{ minWidth: 700 }} stickyHeader aria-label="custom pagination table" >
     <TableHead>
         <TableRow>
           {header?.map((v,i) => {
               return <TableCell key={i} style={{color:"black",fontSize:"14px",fontWeight:"bolder"}}  align={i == 0 ? "left" : 'center'} >{v}</TableCell>
           })}
          
         </TableRow>
       </TableHead>
         {tableContent}
         
     
         
       <TablePagination
             rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
             colSpan={3}
             count={rows.length}
             rowsPerPage={rowsPerPage}
             
             page={page}
             SelectProps={{
               inputProps: {
                 'aria-label': 'rows per page',
               },
               native: true,
             }}
             onPageChange={handleChangePage}
             onRowsPerPageChange={handleChangeRowsPerPage}
             ActionsComponent={TablePaginationActions}
           />
       
       
     </Table>
 
   </TableContainer>
    </Paper>
 
  );
}