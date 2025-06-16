import {Box, Text} from "@chakra-ui/react";
import {useQuery} from "@tanstack/react-query";
import {useMemo} from "react";
import {CardPost} from "@/features/post/PostFeed/CardPost";
import {useNavigate} from "react-router-dom";
import {PostService} from "@/service/post/index.service";
import {CardPostDetails} from "../PostFeed/CardPostDetails";

export function PostUserList() {
  const navigate = useNavigate();

  const {data: postUserListResponse} = useQuery({
    queryKey: ["postUserList"],
    queryFn: async () => {
      return await PostService.getAll({
        user_id: "4c02d404-51f8-4b7e-ad94-7023eb53aaf8",
        limite: 100,
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
            Meus itens
          </Text>
          <Box
            display={"flex"}
            flexDir={"column"}
            flexWrap={"wrap"}
            gap={"25px"}
            w={"60rem"}
            mx={"auto"}
            borderRadius={"10px"}
          >
            {postUserList?.map((post, idx) => (
              <CardPostDetails
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
