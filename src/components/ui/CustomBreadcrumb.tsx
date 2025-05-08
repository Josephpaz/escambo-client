import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbRoot,
  BreadcrumbSeparator,
  Stack
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const routeNameMap: Record<string, string> = {
  "": "Home",
  "history": "Histórico",
  "product": "Incluir Item",
  "favorits": "Favoritos"
};

export function CustomBreadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const crumbs = pathnames.map((segment, index) => {
    const href = `/${pathnames.slice(0, index + 1).join("/")}`;
    const isLast = index === pathnames.length - 1;

    return (
      <>
        <BreadcrumbItem key={href}>
          <BreadcrumbLink
            href={href}
            color={isLast ? "#373E4B" : "#718096"}
            _hover={{ color: "teal.700", textDecoration: "underline" }}
            fontWeight={isLast ? "semibold" : "normal"}
          >
            {routeNameMap[segment] || segment}
          </BreadcrumbLink>
        </BreadcrumbItem>
        {!isLast && <BreadcrumbSeparator />}
      </>
    );
  });

  return (
    <Stack p={5} ml={5}>
      <BreadcrumbRoot
        display="flex"        
        alignItems="center"
        fontWeight="semibold"
        fontSize="sm"
        gap={2}      
        listStyle={'none'}       
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/" _hover={{ color: "teal.700", textDecoration: "underline" }}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathnames.length > 0 && <BreadcrumbSeparator />}
        {crumbs}
      </BreadcrumbRoot>
    </Stack>
  );
}
