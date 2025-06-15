import {PostService} from "@/service/post/index.service";
import {Box, Text} from "@chakra-ui/react";
import {useQuery} from "@tanstack/react-query";
import {useMemo} from "react";
import {categories} from "../CreatePost/CreatePost.page";
import {CardPost} from "./CardPost";
import {Order} from "@/types";
import {useNavigate} from "react-router-dom";

export function PostFeed() {
  const navigate = useNavigate();

  const {data: postEletronicsFeedResponse} = useQuery({
    queryKey: ["postEletronicFeed"],
    queryFn: async () => {
      return await PostService.getAll({
        categoria: categories[0].value,
        ordenacao: Order.DESC,
      });
    },
  });

  const {data: postClothesFeedResponse} = useQuery({
    queryKey: ["postClothesFeed"],
    queryFn: async () => {
      return await PostService.getAll({
        categoria: categories[1].value,
        ordenacao: Order.DESC,
      });
    },
  });

  const {data: postBooksFeedResponse} = useQuery({
    queryKey: ["postBooksFeed"],
    queryFn: async () => {
      return await PostService.getAll({
        categoria: categories[2].value,
        ordenacao: Order.DESC,
      });
    },
  });

  const postEletronicsFeed = useMemo(() => {
    return postEletronicsFeedResponse?.data;
  }, [postEletronicsFeedResponse]);

  const postClothesFeed = useMemo(() => {
    return postClothesFeedResponse?.data;
  }, [postClothesFeedResponse]);

  const postBooksFeed = useMemo(() => {
    return postBooksFeedResponse?.data;
  }, [postBooksFeedResponse]);

  return (
    <Box display={"flex"} flexDir={"column"} gap={"5rem"}>
      {(postEletronicsFeed ?? [])?.length > 0 && (
        <Box display={"flex"} flexDir={"column"} gap={"12px"} w="fit-content">
          <Text fontSize={"32px"} fontWeight={"bold"} color={"#1DAF87"}>
            {categories[0].label}
          </Text>
          <Box
            display={"flex"}
            gap={"12px"}
            w={"80vw"}
            overflowX={"auto"}
            py={4}
            m={0}
          >
            {postEletronicsFeed?.map((post, idx) => (
              <CardPost
                key={post.user_id + "___" + idx}
                post={post}
                onClick={() => navigate(`post/${post.id}`)}
              />
            ))}
          </Box>
        </Box>
      )}

      {(postClothesFeed ?? [])?.length > 0 && (
        <Box display={"flex"} flexDir={"column"} gap={"12px"} w="fit-content">
          <Text fontSize={"32px"} fontWeight={"bold"} color={"#1DAF87"}>
            {categories[1].label}
          </Text>
          <Box
            display={"flex"}
            gap={"12px"}
            w={"80vw"}
            overflowX={"auto"}
            py={4}
            m={0}
          >
            {postClothesFeed?.map((post, idx) => (
              <CardPost
                key={post.user_id + "___" + idx}
                post={post}
                onClick={() => navigate(`post/${post.id}`)}
              />
            ))}
          </Box>
        </Box>
      )}

      {(postBooksFeed ?? [])?.length > 0 && (
        <Box display={"flex"} flexDir={"column"} gap={"12px"} w="fit-content">
          <Text fontSize={"32px"} fontWeight={"bold"} color={"#1DAF87"}>
            {categories[2].label}
          </Text>
          <Box
            display={"flex"}
            gap={"12px"}
            w={"80vw"}
            overflowX={"auto"}
            py={4}
            m={0}
          >
            {postBooksFeed?.map((post, idx) => (
              <CardPost
                key={post.user_id + "___" + idx}
                post={post}
                onClick={() => navigate(`post/${post.id}`)}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
