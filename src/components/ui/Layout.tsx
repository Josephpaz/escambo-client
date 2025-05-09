import { useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import {
  Box,
  Flex,
} from "@chakra-ui/react";
import { PageLoader } from "./PageLoader";
import { NavBar } from "@/components/ui/Navbar";


export function Layout() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      {loading && <PageLoader />}

      <Flex
        direction="column"
        minHeight="100vh"
      >
        <NavBar />
        <Box as="main" flex="1" p={4}>
          <Outlet />
        </Box>
      </Flex>
    </>
  );
}


