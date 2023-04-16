import { 
    Box,
    Button,
    Text,
} from '@mantine/core';

export default function WinPercent({ openWinPercent }: any){
    return(
        <div className='flex flex-col items-center gap-8'>
            <Text
                sx={{
                    fontSize: '28px'
                }}
            >
                Win Percent
            </Text>

            <Box>
                <Text>win percentage will be displayed here</Text>
            </Box>

            <Button
                variant='outline'
                onClick={() => openWinPercent('close')}
            >
                Clear Response
            </Button>
        </div>
    )
}