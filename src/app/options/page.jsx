"use client";

import React, { useState } from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";

const Options = () => {
  const [openNewOptionEntry, setOpenNewOptionEntry] = useState(false);
  const [tradeSide, setTradeSide] = useState("buy to open");

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Stack spacing={3}>
      <Stack textAlign="center" spacing={2} padding={2}>
        <Typography variant="h5" gutterBottom>
          Options
        </Typography>
      </Stack>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        justifyContent="flex-end"
      >
        <Button
          variant="contained"
          onClick={() => {
            setOpenNewOptionEntry(true);
          }}
        >
          New Option Entry
        </Button>
      </Stack>

      {/* accordion */}
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
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

      <Dialog
        open={openNewOptionEntry}
        onClose={() => {
          setOpenNewOptionEntry(false);
        }}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            () => {
              setOpenNewOptionEntry(false);
            };
          },
        }}
      >
        <DialogTitle>New Options Entry</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter option contract information below
          </DialogContentText>
          <Stack gap={2}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="symbol"
              name="symbol"
              label="Symbol"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="shares"
              name="shares"
              label="Quantity of shares"
              type="number"
              fullWidth
              variant="standard"
            />
            <FormControl variant="standard" fullWidth>
              <InputLabel id="tradeSideSelect">Trade Side</InputLabel>
              <Select
                labelId="tradeSideSelect"
                value={tradeSide}
                onChange={() => {}}
              >
                <MenuItem value={tradeSide}>Buy to open</MenuItem>
                <MenuItem value={tradeSide}>Buy to close</MenuItem>
                <MenuItem value={tradeSide}>Sell to open</MenuItem>
                <MenuItem value={tradeSide}>Sell to close</MenuItem>
              </Select>
            </FormControl>
            <TextField
              autoFocus
              required
              margin="dense"
              id="price"
              name="price"
              label="Price"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="tradeDate"
              name="tradeDate"
              type="date"
              fullWidth
              variant="standard"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenNewOptionEntry(false);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default Options;
