import {
    Box,
    chakra,
    CloseButton,
    HStack,
    Icon,
    ListItem,
    ListRoot,
    Text
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FiUpload } from 'react-icons/fi'

export function UploadImagem() {
    const [files, setFiles] = useState<File[]>([])

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const selectedFiles = event.target.files
        if (!selectedFiles) return

        const allowedTypes = ['image/png', 'image/jpeg']

        const validFiles = Array.from(selectedFiles).filter(file =>
            allowedTypes.includes(file.type)
        )

        const invalidFiles = Array.from(selectedFiles).filter(file =>
            !allowedTypes.includes(file.type)
        )

        if (invalidFiles.length > 0) {
            alert(`Só são permitidos arquivos PNG e JPEG. ${invalidFiles.length} arquivo(s) inválido(s) foram ignorados.`)
        }

        setFiles(prev => [...prev, ...validFiles])
        event.target.value = ''
    }


    function removeFile(index: number) {
        setFiles(prev => prev.filter((_, i) => i !== index))
    }

    return (
        <HStack maxW="700px" mx="auto" p={4}>
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
                borderRadius="md"
                _hover={{ bg: 'gray.50' }}
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
                    style={{ display: 'none' }}
                />
            </chakra.label>

            {files.length > 0 && (
                <Box
                    overflowY="auto"
                    borderRadius="md"
                    p={3}
                >
                    <ListRoot>
                        {files.map((file, index) => (
                            <ListItem
                                key={index}
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                p={2}
                                margin={"-2"}
                                borderRadius="md"
                            >
                                <Text fontSize={13}>
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
        </HStack>
    )
}
