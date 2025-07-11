import {Box, Text} from "@chakra-ui/react";
import {useQuery} from "@tanstack/react-query";
import {useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {PostService} from "@/service/post/index.service";
import {CardPostDetails} from "../PostFeed/CardPostDetails";
import {PageLoader} from "@/components/ui/PageLoader";
import {useSessionStore} from "@/zustand";

export function PostUserList() {
  const navigate = useNavigate();
  const user = useSessionStore((state) => state.user);

  const {data: postUserListResponse, isPending} = useQuery({
    queryKey: ["postUserList"],
    queryFn: async () => {
      return await PostService.getAll({
        user_id: user!.id,
        limite: 100,
      });
    },
  });

  const postUserList = useMemo(() => {
    return postUserListResponse?.data;
  }, [postUserListResponse]);

  if (isPending) return <PageLoader />;

  return (
    <Box display={"flex"} flexDir={"column"}>
      {(postUserList ?? [])?.length > 0 && (
        <Box display={"flex"} flexDir={"column"} gap={"12px"}>
          <Text
            fontSize={"32px"}
            fontWeight={"bold"}
            color={"#1DAF87"}
            textAlign={"center"}
            mb={"2rem"}
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
