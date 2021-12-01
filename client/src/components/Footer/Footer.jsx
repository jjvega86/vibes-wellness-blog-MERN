import React from "react";
import { Container, Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          VIBES
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          A wellness blog
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
