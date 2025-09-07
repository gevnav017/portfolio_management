"use client";

// route imports
import { useState } from "react";

// MUI imports
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const CustomButton = ({ label, variant, color, icon, onClick }) => {
  return (
    <Button variant={variant} color={color} onClick={onClick}>
      {label && <span>{label}</span>}
      {icon && <span style={{ marginLeft: 8 }}>{icon}</span>}
    </Button>
  );
};

export const CustomIconButton = ({ variant, color, icon, onClick }) => {
  return (
    <IconButton
      sx={{
        width: 40,
        height: 40,
      }}
      variant={variant}
      color={color}
      onClick={onClick}
    >
      {icon && icon}
    </IconButton>
  );
};

export const UpdateDeleteIconButton = ({
  openUpdate,
  setOpenUpdate,
  openDelete,
  setOpenDelete,
  selected,
  setSelected,
}) => {
  const [anchorMoreDropDown, setAnchorMoreDropDown] = useState(null);
  const openMoreDropDown = Boolean(anchorMoreDropDown);

  return (
    <>
      <IconButton
        id="moreMenuButton"
        onClick={(e) => {
          e.stopPropagation();
          setAnchorMoreDropDown(e.currentTarget);
          setSelected(selected);
        }}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="moreMenu"
        anchorEl={anchorMoreDropDown}
        open={openMoreDropDown}
        onClose={() => setAnchorMoreDropDown(null)}
      >
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            setAnchorMoreDropDown(null);
            setOpenUpdate(!openUpdate);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          sx={{ color: "danger.main" }}
          onClick={(e) => {
            e.stopPropagation();
            setAnchorMoreDropDown(null);
            setOpenDelete(!openDelete);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export const StockMoreButton = ({
  openUpdate,
  setOpenUpdate,
  openDelete,
  setOpenDelete,
  openNotes,
  setOpenNotes,
  openCoveredCall,
  setOpenCoveredCall,
  selected,
  setSelected,
}) => {
  const [anchorMoreDropDown, setAnchorMoreDropDown] = useState(null);
  const openMoreDropDown = Boolean(anchorMoreDropDown);

  return (
    <>
      <IconButton
        id="moreMenuButton"
        onClick={(e) => {
          e.stopPropagation();
          setAnchorMoreDropDown(e.currentTarget);
          setSelected(selected);
        }}
      >
        <MoreHorizIcon/>
      </IconButton>
      <Menu
        id="moreMenu"
        anchorEl={anchorMoreDropDown}
        open={openMoreDropDown}
        onClose={() => setAnchorMoreDropDown(null)}
      >
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            setAnchorMoreDropDown(null);
          }}
        >
          Mark as Closed
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            setAnchorMoreDropDown(null);
            setOpenNotes(!openNotes);
          }}
        >
          Notes
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            setAnchorMoreDropDown(null);
            setOpenUpdate(!openUpdate);
          }}
        >
          Close Position
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            setAnchorMoreDropDown(null);
            setOpenCoveredCall(!openCoveredCall);
          }}
        >
          Open Covered Call
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            setAnchorMoreDropDown(null);
          }}
        >
          Shares Called Away
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            setAnchorMoreDropDown(null);
            setOpenUpdate(!openUpdate);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          sx={{ color: "danger.main" }}
          onClick={(e) => {
            e.stopPropagation();
            setAnchorMoreDropDown(null);
            setOpenDelete(!openDelete);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export const OptionMoreButton = ({
  onCloseUpdate,
  onCloseDelete,
  onCloseNotes,
  selected,
  setSelected,
}) => {
  const [anchorMoreDropDown, setAnchorMoreDropDown] = useState(null);
  const openMoreDropDown = Boolean(anchorMoreDropDown);

  return (
    <>
      <IconButton
        id="moreMenuButton"
        onClick={(e) => {
          e.stopPropagation();
          setAnchorMoreDropDown(e.currentTarget);
          setSelected(selected);
        }}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="moreMenu"
        anchorEl={anchorMoreDropDown}
        open={openMoreDropDown}
        onClose={() => setAnchorMoreDropDown(null)}
      >
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            setAnchorMoreDropDown(null);
          }}
        >
          Mark as Closed
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            setAnchorMoreDropDown(null);
            onCloseNotes();
          }}
        >
          Notes
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            setAnchorMoreDropDown(null);
            setOpenUpdate(!openUpdate);
          }}
        >
          Close Position
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            setAnchorMoreDropDown(null);
            onCloseUpdate();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          sx={{ color: "danger.main" }}
          onClick={(e) => {
            e.stopPropagation();
            setAnchorMoreDropDown(null);
            onCloseDelete();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export const CryptoMoreButton = ({
  openUpdate,
  setOpenUpdate,
  openDelete,
  setOpenDelete,
  openNotes,
  setOpenNotes,
  selected,
  setSelected,
}) => {
  const [anchorMoreDropDown, setAnchorMoreDropDown] = useState(null);
  const openMoreDropDown = Boolean(anchorMoreDropDown);

  return (
    <>
      <IconButton
        id="moreMenuButton"
        onClick={(e) => {
          e.stopPropagation();
          setAnchorMoreDropDown(e.currentTarget);
          setSelected(selected);
        }}
      >
        <MoreHorizIcon/>
      </IconButton>
      <Menu
        id="moreMenu"
        anchorEl={anchorMoreDropDown}
        open={openMoreDropDown}
        onClose={() => setAnchorMoreDropDown(null)}
      >
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            setAnchorMoreDropDown(null);
            setOpenNotes(!openNotes);
          }}
        >
          Notes
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            setAnchorMoreDropDown(null);
            setOpenUpdate(!openUpdate);
          }}
        >
          Close Position
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            setAnchorMoreDropDown(null);
            setOpenUpdate(!openUpdate);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          sx={{ color: "danger.main" }}
          onClick={(e) => {
            e.stopPropagation();
            setAnchorMoreDropDown(null);
            setOpenDelete(!openDelete);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};
