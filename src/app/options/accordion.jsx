"use client";

import { useState } from "react";

import {
  Box,
  Stack,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Divider,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const OptionsAccordion = () => {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {["test", "test1"].map((el) => (
        <Accordion
          key={el}
          expanded={expanded === el}
          onChange={handleChange(el)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box
              border="solid black"
              display="flex"
              justifyContent="space-between"
              width="100%"
            >
              <Typography>TGT</Typography>
              <div>Buttons</div>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <Typography>Table</Typography>
              <Divider />
              <Typography>Summary of net premium totals</Typography>
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default OptionsAccordion;
