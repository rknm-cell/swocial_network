
import {Box} from '@mui/material';
import NavBar from "scenes/navbar";
import { useSelector } from "react-redux";
import UserWidget from "scenes/widgets/UserWidget";

const HomePage = () => {
  const {_id, picturePath} = useSelector((state) => state.user);
  return (
    <Box>
      <NavBar />

      <Box width="100%" padding="2rem 6%"
      display="block"
      gap="0.5rem"
      justifyContent="space-between"
      >
        <UserWidget userId={_id} picturePath={picturePath} />

      </Box>
    </Box>
  );
};

export default HomePage;
