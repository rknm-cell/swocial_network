import { Box, useMediaQuery } from "@mui/material"
import Friend from "components/Friend"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import FriendListWidget from "scenes/widgets/FriendListWidget"
import MyPostWidget from "scenes/widgets/MyPostWidget"
import PostsWidget from "scenes/widgets/PostsWidget"
import UserWidget from "scenes/widgets/UserWidget"
import NavBar from "scenes/navbar"


const ProfilePage = () => {
  const [user, setUser] = useState({})
  const {userId} = useParams()
  const token = useSelector((state) => state.token)
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await response.json();
  setUser(data)
  console.log(user)
  }

  useEffect(() => {
    getUser()
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
    <NavBar />

    <Box
      id="user-widget-box"
      width="100%"
      padding="2rem 6%"
      gap="2rem"
      display={isNonMobile ? "flex" : "block"}
      justifyContent="center"
    >
      <Box flexBasis={isNonMobile ? "26%" : undefined}>
        <UserWidget user={user} picturePath={user.picturePath} />
        <Box m="2rem 0"/>
        <FriendListWidget userId={userId}/>
      </Box>
        <Box flexBasis = {isNonMobile ? "42%" : undefined}
        mt={isNonMobile ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath}/>
          <Box m="2rem 0"/>
          <PostsWidget userId={userId} isProfile/>
        </Box>
 
    </Box>
  </Box>
  )
}

export default ProfilePage