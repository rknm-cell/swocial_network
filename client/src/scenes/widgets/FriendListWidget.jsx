import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const FriendListWidget = ({ userId, friends }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  // const friends = useSelector((state) => state.user.friends);
  console.log(token)
  console.log(userId)
  const getFriends = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/friends`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
console.log(friends)
  useEffect(() => {
    getFriends();
    
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
      {loading ? (
          <Typography>isLoading</Typography> // replace with your spinner component
        ) : (
          <>
            Friend's List
            {friends && friends.map((friend) => (
              <Friend
                key={friend._id}
                friendId={friend._id}
                name={`${friend.firstName}`}
                userPicturePath={friend.picturePath}
              />
            ))}
          </>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;