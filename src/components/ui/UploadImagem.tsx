import {
  Box,
  chakra,
  CloseButton,
  HStack,
  Icon,
  ListItem,
  ListRoot,
  Text,
} from "@chakra-ui/react";
import React, {useState} from "react";
import {FiUpload} from "react-icons/fi";

type UploadImagemProps = {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

export function generateId(length = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function UploadImagem({files, setFiles}: UploadImagemProps) {
  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const allowedTypes = ["image/png", "image/jpeg"];
    const maxSizeInBytes = 5 * 1024 * 1024;

    const validFiles = Array.from(selectedFiles).filter(
      (file) => allowedTypes.includes(file.type) && file.size <= maxSizeInBytes
    );

    const invalidFiles = Array.from(selectedFiles).filter(
      (file) => !allowedTypes.includes(file.type) || file.size > maxSizeInBytes
    );

    if (invalidFiles.length > 0) {
      alert(
        `Só são permitidos arquivos PNG e JPEG com tamanho máximo de 5MB são permitidos. ${invalidFiles.length} arquivo(s) inválido(s) foram ignorados.`
      );
    }

    const renamedFiles = validFiles.map((file) => {
      const extension = file.name.split(".").pop();
      const newName = `img-${generateId()}.${extension}`;

      return new File([file], newName, {type: file.type});
    });

    setFiles((prev) => [...prev, ...renamedFiles]);

    event.target.value = "";
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <>
      <HStack maxW="700px" mx="auto" margin={0} flexDirection="column">
        <chakra.label
          htmlFor="file-upload"
          cursor="pointer"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          bg="#FFFFFF"
          p={4}
          w="126px"
          h="106px"
          border="1px dashed #A0AEC0"
          borderRadius="md"
          _hover={{bg: "gray.50"}}
          transition="background 0.2s"
          textAlign="center"
        >
          <Icon as={FiUpload} boxSize={8} color="#A0AEC0" mb={2} />
          <Text fontSize={12} color="#A0AEC0" fontWeight="normal">
            Faça o upload de suas fotos
          </Text>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            style={{display: "none"}}
          />
        </chakra.label>
      </HStack>
      {files.length > 0 && (
        <Box
          overflowY="auto"
          borderRadius="md"
          p={3}
          maxW="700px"
          w="full"
          maxH="300px"
        >
          <ListRoot>
            {files.map((file, index) => (
              <ListItem
                key={index}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={2}
                margin="-2"
                borderRadius="md"
              >
                <Box
                  boxSize="50px"
                  mr={3}
                  overflow="hidden"
                  borderRadius="md"
                  flexShrink={0}
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    style={{width: "100%", height: "100%", objectFit: "cover"}}
                  />
                </Box>
                <Text fontSize={13} flex="1">
                  {file.name}
                </Text>
                <CloseButton
                  size="sm"
                  onClick={() => removeFile(index)}
                  aria-label={`Remover ${file.name}`}
                />
              </ListItem>
            ))}
          </ListRoot>
        </Box>
      )}
    </>
  );
}
