import {
    ButtonGroup,
    IconButton,
    Stack
} from "@chakra-ui/react";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
        <Stack alignItems={'center'}>
            <ButtonGroup variant="ghost" size={"md"}>
                <IconButton
                    aria-label="Previous page"
                    onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                    color={"#232D3D"}
                    _hover={{ color: "#1DAF87" }}
                ><FaAngleLeft /></IconButton>


                {Array.from({ length: totalPages }).map((_, index) => (
                    <IconButton
                        key={index + 1}
                        aria-label={`Page ${index + 1}`}
                        onClick={() => onPageChange(index + 1)}
                        variant={currentPage === index + 1 ? "outline" : "ghost"}
                        _hover={{ color: "#1DAF87" }}
                        color={"#232D3D"}
                    >
                        {index + 1}
                    </IconButton>
                ))}

                <IconButton
                    aria-label="Next page"
                    onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                    color={"#232D3D"}
                    _hover={{ color: "#1DAF87" }}
                ><FaAngleRight /></IconButton>
            </ButtonGroup>
        </Stack>
    );
};
