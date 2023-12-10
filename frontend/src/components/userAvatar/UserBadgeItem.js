import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/react";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="purple"
      cursor="pointer"
      onClick={handleFunction}
    >
      {/* {console.log("admin =======> ", admin)}
      {console.log("user._id =======> ", user._id)} */}
      {user.name}
      {admin._id === user._id && (
        <span style={{ color: "lightgrey" }}>
          <sub> Admin</sub>
        </span>
      )}
      <Tooltip label="Remove user">
        <CloseIcon pl={1} />
      </Tooltip>
    </Badge>
  );
};

export default UserBadgeItem;
