
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form"

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileDevice = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary" >
          Swolecial Network
        </Typography>
      </Box>
      <Box
      width={isNonMobileDevice ? "50%" : "94%"}
      p="2rem"
      m="2rem auto"
      borderRadius="1.5rem"
      textAlign="center"
      backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{mb: "1.5rem"}} >
          Let's get Swole on the Swolecial Network 💪!

        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
