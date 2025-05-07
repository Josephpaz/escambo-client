

import { Breadcrumb, Stack } from "@chakra-ui/react"

export function CustomBreadcrumb() {
  return (
    <Stack>
      <Breadcrumb.Root size={'sm'} p={4} fontWeight={'semibold'}>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/" 
              color="#373E4B"
              _hover={{ color: "teal.700", textDecoration: "underline" }}
            >Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/history"
              color="#373E4B"
              _hover={{ color: "teal.700", textDecoration: "underline" }}
            >Historico</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
    </Stack>
  )
}
