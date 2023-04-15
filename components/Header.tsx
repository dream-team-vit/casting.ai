import { Box, Header, Image, Text } from "@mantine/core"
import { useRouter } from "next/router";

export default function HeaderSection(){
    const router = useRouter()
    return(
        <Box>
            <Header
                height={60}
                px="md"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
            >
                <Box className="flex gap-1 items-center">
                    <Image src={'./casting.ai-logo.png'} alt="Casting.ai" width={25} height={25}/>

                    <Text
                        onClick={() => {
                            router.push("/");
                        }}
                        size="xl"
                        className="cursor-pointer"
                    >
                        casting.ai
                    </Text>
                </Box>

            </Header>
        </Box>
    )
}