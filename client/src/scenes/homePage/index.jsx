import { Box, useMediaQuery } from "@mui/material";
import NavBar from "scenes/navbar";
import { useSelector } from "react-redux";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import { useEffect, useState } from "react";

const HomePage = () => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${_id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
    console.log(data);
  };

  useEffect(() => {
    getUser();
    console.log(user)
  }, []);
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
          <UserWidget user={user} picturePath={user.picturePath} />
        </Box>
          <Box flexBasis = {isNonMobile ? "42%" : undefined}
          mt={isNonMobile ? undefined : "2rem"}
          >
            <MyPostWidget picturePath={picturePath}/>
            <PostsWidget userId={user._id}/>
          </Box>
    {isNonMobile && <Box flexBasis="26%" mt="2rem">
      <FriendListWidget userId={user._id} friends={user.friends}/>
      </Box>}
      </Box>
    </Box>
  );
};

export default HomePage;
