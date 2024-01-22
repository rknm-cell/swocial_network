import { Box, useMediaQuery } from "@mui/material";
import NavBar from "scenes/navbar";
import { useSelector } from "react-redux";
import UserWidget from "scenes/widgets/UserWidget";

const HomePage = () => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  console.log(_id)
  console.log(useSelector((state)=> state.user))
  return (
    <Box>
      <NavBar />

      <Box
        id="user-widget-box"
        width="100%"
        padding="2rem 6%"
        gap="0.5rem"
        display={isNonMobile ? "flex" : "block"}
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobile ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
          <Box flexBasis = {isNonMobile ? "42%" : undefined}
          mt={isNonMobile ? undefined : "2rem"}
          >

          </Box>
    {isNonMobile && <Box flexBasis="26%" mt="2rem"></Box>}
      </Box>
    </Box>
  );
};

export default HomePage;
