"use client";

import { useState } from "react";

import Category from "./category";

import {
  Stack,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,

} from "@mui/material";

const ListMenu = ({ categories }) => {
  const [menuItemSelected, setMenuItemSelected] = useState("");

  const menuItems = [
    { name: "Users", component: "" },
    { name: "Category", component: <Category categories={categories} /> },
  ];

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      minHeight="100vh"
    >
      {/* side menu */}
      <Stack sx={{ width: "20%", p: 3, minWidth: 160 }}>
        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Settings Menu
            </ListSubheader>
          }
        >
          {menuItems?.map((menuItem) => (
            <ListItemButton
              key={menuItem.name}
              selected={menuItemSelected === menuItem.name}
              onClick={() => {
                setMenuItemSelected(menuItem.name);
              }}
            >
              <ListItemText primary={menuItem.name} />
            </ListItemButton>
          ))}
        </List>
      </Stack>

      {/* main section */}
      <Stack sx={{ flexGrow: 1 }}>
        {menuItemSelected
          ? menuItems?.map(
              (menuItem) =>
                menuItemSelected === menuItem.name && (
                  <Stack key={menuItem.name} spacing={3}>
                    {menuItem.component}
                  </Stack>
                )
            )
          : "select from menu"}
      </Stack>
    </Stack>
  );
};

export default ListMenu;
