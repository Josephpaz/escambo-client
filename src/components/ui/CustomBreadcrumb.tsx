import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbRoot,
  BreadcrumbSeparator,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import {useLocation} from "react-router-dom";

const routeNameMap: Record<string, string> = {
  "": "Home",
  history: "Histórico",
  favorites: "Favoritos",
  post: "Incluir Item",
};

const isUUID = (str: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    str
  );

export function CustomBreadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  let crumbs: {label: string; href: string}[] = [];

  if (pathnames.length === 0) {
    crumbs = [];
  } else if (pathnames.length === 1) {
    const label = routeNameMap[pathnames[0]] || pathnames[0];
    crumbs = [{label, href: location.pathname}];
  } else if (pathnames.length === 2 && isUUID(pathnames[1])) {
    crumbs = [{label: "Detalhes do Item", href: location.pathname}];
  } else if (pathnames.length === 3 && isUUID(pathnames[1])) {
    crumbs = [{label: "Edição do Item", href: location.pathname}];
  } else if (pathnames.length === 2 && pathnames[1] === "posts") {
    crumbs = [{label: "Meus itens", href: location.pathname}];
  } else {
    crumbs = pathnames.map((segment, i) => {
      const href = "/" + pathnames.slice(0, i + 1).join("/");
      return {
        label: routeNameMap[segment] || segment,
        href,
      };
    });
  }

  return (
    <Stack p={5} ml={5}>
      <BreadcrumbRoot
        display="flex"
        alignItems="center"
        fontWeight="semibold"
        fontSize="sm"
        gap={2}
        listStyle="none"
      >
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            _hover={{color: "teal.700", textDecoration: "underline"}}
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        {crumbs.length > 0 && <BreadcrumbSeparator />}

        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <React.Fragment key={crumb.href}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={crumb.href}
                  color={isLast ? "#373E4B" : "#232D3D"}
                  _hover={{color: "teal.700", textDecoration: "underline"}}
                  fontWeight={isLast ? "semibold" : "normal"}
                >
                  {crumb.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {i < crumbs.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbRoot>
    </Stack>
  );
}
