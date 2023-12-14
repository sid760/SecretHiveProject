import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import Lottie from "react-lottie";
import animationData from "../Animation - 1702404269691.json"; // Import your Lottie animation JSON file
import logoAnimationData from "../Animation - 1702565803694.json";

function Homepage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  // Lottie options for your animation
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
 // Lottie options for your logo

  const logoLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: logoAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Box position="relative" height="100vh">
      {/* Lottie Animation */}
      <Lottie options={lottieOptions} height="100%" width="100%" />

      {/* Content */}
      <Container maxW="xl" centerContent position="absolute" top="0" left="0" right="0" bottom="0">
        <Box
          d="flex"
          justifyContent="center"
          p={3}
          bg="white"
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
        >
        <Box mb={1}>
            <Lottie options={logoLottieOptions} height={51} width={50} />
          </Box>
          <Text fontSize="4xl" fontFamily="Work sans" fontWeight="bold">
            SecretHive
          </Text>
        </Box>
        <Box
          bg="white"
          w="100%"
          p={4}
          borderRadius="lg"
          borderWidth="1px"
          mb="25%"
        >
          <Tabs isFitted variant="soft-rounded">
            <TabList mb="1em">
              <Tab>Login</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
}

export default Homepage;
