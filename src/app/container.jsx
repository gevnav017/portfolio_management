import { Container } from "@mui/material";

const ContainerProvider = ({ children }) => {
  return <Container maxWidth="xl">{children}</Container>;
};

export default ContainerProvider;
