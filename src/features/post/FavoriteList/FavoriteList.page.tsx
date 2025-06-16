import {Box, Text} from "@chakra-ui/react";
import {useQuery} from "@tanstack/react-query";
import {useMemo} from "react";
import {categories} from "../CreatePost/CreatePost.page";
import {CardPost} from "@/features/post/PostFeed/CardPost";
import {useNavigate} from "react-router-dom";
import {FavoriteService} from "@/service/favorite/index.service";
import {PageLoader} from "@/components/ui/PageLoader";

export function FavoriteList() {
  const navigate = useNavigate();

  const {data: favoriteListResponse, isPending} = useQuery({
    queryKey: ["favoriteList"],
    queryFn: async () => {
      return await FavoriteService.getAll({
        userId: "a175a1b6-1c8b-4b9c-a67f-1a939a97232e",
      });
    },
  });

  const favoriteList = useMemo(() => {
    return favoriteListResponse?.data;
  }, [favoriteListResponse]);

  if (isPending) return <PageLoader />;

  return (
    <Box display={"flex"} flexDir={"column"} gap={"5rem"}>
      {(favoriteList ?? [])?.length > 0 && (
        <Box display={"flex"} flexDir={"column"} gap={"12px"}>
          <Text
            fontSize={"32px"}
            fontWeight={"bold"}
            color={"#1DAF87"}
            textAlign={"center"}
          >
            {categories[0].label}
          </Text>
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            gap={"12px"}
            w={"80vw"}
            py={4}
            m={0}
          >
            {favoriteList?.map((post, idx) => (
              <CardPost
                key={post.user_id + "___" + idx}
                post={post}
                onClick={() => navigate(`/post/${post.id}`)}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
