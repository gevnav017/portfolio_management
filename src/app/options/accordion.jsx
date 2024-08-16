"use client";

// import React, { useState } from "react";

// import {
//   Accordion,
//   AccordionDetails,
//   AccordionSummary,
//   Typography,
//   Divider,
// } from "@mui/material";

// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// const OptionsAccordion = () => {
//   const [expanded, setExpanded] = useState(false);

//   const handleChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   return (
//     <Accordion
//       expanded={expanded === "panel1"}
//       onChange={handleChange("panel1")}
//     >
//       <AccordionSummary
//         expandIcon={<ExpandMoreIcon />}
//         aria-controls="panel1bh-content"
//         id="panel1bh-header"
//       >
//         <Box
//           border="solid black"
//           display="flex"
//           justifyContent="space-between"
//           width="100%"
//         >
//           <Typography>TGT</Typography>
//           <div>Buttons</div>
//         </Box>
//       </AccordionSummary>
//       <AccordionDetails>
//         <Stack spacing={2}>
//           <Typography>Table</Typography>
//           <Divider />
//           <Typography>Summary of net premium totals</Typography>
//         </Stack>
//       </AccordionDetails>
//     </Accordion>
//   );
// };

// export default OptionsAccordion;

import React from 'react'

const OptionsAccordion = () => {
  return (
    <div>OptionsAccordion</div>
  )
}

export default OptionsAccordion