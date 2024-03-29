import { Modal, TableBody } from "@mui/material";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CustomBarChart from "./CustomBarChart";
import CustomPieChart from "./CustomPieChart";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery } from "react-query";


type DetailModalProps = {
  open: boolean;
  handleClose: () => void;
  month: number;
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: 2,
  bgcolor: "white",
  boxShadow: 24,
  height: 600, 
  width: {
    xs: "90%",
    sm: "70%",
    md: "800px",
  },
  overflow: "auto",
  p: 4,
};

const DetailModal = ({ open, handleClose, month }: DetailModalProps) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["monthly-stats", month],
    queryFn: async () => {
      const res = await fetch(
        `https://transaction-backend.onrender.com/api/v1/transactions/monthly-stats?month=${month}`
      );
      return res.json();
    },
  });

  let content;

  if (isLoading) {
    content = (
      <Box height={400} sx={{ display: "grid", placeContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    console.log(error)
    content = <Box>Error</Box>;
  }
  if (data) {
    content = (
      <>
        <Table sx={{ marginBottom: 4 }}>
          <TableBody>
            <TableRow>
              <TableCell>Total Sale</TableCell>
              <TableCell>${data.stats.totalPrice}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Sold Items</TableCell>
              <TableCell>{data.stats.sold}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Not Sold Items</TableCell>
              <TableCell>{data.stats.unsold}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Box>
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Bar Chart
              <CustomBarChart barChartData={data.barChartData} />
            </Typography>
          </Box>
          <Divider sx={{marginTop:2, marginBottom:4}}/>
          <CustomPieChart pieChartData={data.pieChartData} />
        </Box>
      </>
    );
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Monthly Sales Detail Modal"
      aria-describedby="Monthly Sales Detail Modal"
    >
      <Box bgcolor={"white"}>
        <Box sx={style}>
          <Typography variant="h4" align="center" fontWeight={700}>
            Statistics -{" "}
            {new Date(0, month, 0).toLocaleString("default", { month: "long" })}
          </Typography>
          <Divider sx={{ marginBottom: 4 }} />
          {content}
        </Box>
      </Box>
    </Modal>
  );
};

export default DetailModal;
