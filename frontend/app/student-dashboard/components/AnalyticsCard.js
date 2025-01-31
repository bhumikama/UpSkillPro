import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const AnalyticsCard = ({ totalRevenue, totalStudents }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
        gap: 2,
      }}
    >
      <Card>
        <CardContent sx={{ height: "100%" }}>
          <Typography variant="h5" component="div">
            Total Revenue
          </Typography>
          <Typography
            variant="body2"
            style={{ color: "#212121" }}
            sx={{ fontSize: 24, mt: 1.5, fontWeight: "bold" }}
          >
            {totalRevenue}
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent sx={{ height: "100%" }}>
          <Typography variant="h5" component="div">
            Enrolled Students
          </Typography>
          <Typography
            variant="body2"
            style={{ color: "#212121" }}
            sx={{ fontSize: 24, mt: 1.5, fontWeight: "bold" }}
          >
            {totalStudents}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AnalyticsCard;
