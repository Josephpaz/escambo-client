import {Box, Text} from "@chakra-ui/react";
import {useQuery} from "@tanstack/react-query";
import {useMemo} from "react";
import {categories} from "../CreatePost/CreatePost.page";
import {CardPost} from "@/features/post/PostFeed/CardPost";
import {useNavigate} from "react-router-dom";
import {PostService} from "@/service/post/index.service";

export function PostUserList() {
  const navigate = useNavigate();

  const {data: postUserListResponse} = useQuery({
    queryKey: ["postUserList"],
    queryFn: async () => {
      return await PostService.getAll({
        user_id: "a175a1b6-1c8b-4b9c-a67f-1a939a97232e",
      });
    },
  });

  const postUserList = useMemo(() => {
    return postUserListResponse?.data;
  }, [postUserListResponse]);

  return (
    <Box display={"flex"} flexDir={"column"}>
      {(postUserList ?? [])?.length > 0 && (
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
            gap={"25px"}
            w={"80vw"}
            py={4}
            m={0}
          >
            {postUserList?.map((post, idx) => (
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
