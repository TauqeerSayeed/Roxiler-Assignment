import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import { TableContainer } from "@mui/material";
import Paper from "@mui/material/Paper";

type RowProps = {
  row: {
    productId: number;
    title: string;
    price: number;
    category: string;
    sold: boolean;
    dateOfSale: string;
    image: string;
    description: string;
  };
};

const Row = ({ row }: RowProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell key={1} component="th" scope="row">
          {row.productId}
        </TableCell>
        <TableCell key={2} sx={{fontWeight:700}}>{row.title}</TableCell>
        <TableCell key={3}>${row.price}</TableCell>
        <TableCell key={4}>{row.category}</TableCell>
        <TableCell key={5}>{row.sold.toString()}</TableCell>
        <TableCell key={6}>
          {new Date(row.dateOfSale).toLocaleDateString()}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box padding={2}>
              <TableContainer component={Paper} sx={{overflowX:'auto'}}>
              <Table size="small" >
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <img src={row.image} width={100} />
                    </TableCell>
                    <TableCell>{row.description}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              </TableContainer>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Row;
