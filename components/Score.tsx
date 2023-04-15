import { 
    Box,
    Button,
    Text,
} from '@mantine/core';

export default function PredictedScore({ openPredictScore }: any){
    return(
        <div className='flex flex-col items-center gap-8'>
            <Text
                sx={{
                    fontSize: '28px'
                }}
            >
                Predicted Score
            </Text>
            
            <Box>
                <Text>scores will be displayed here</Text>
            </Box>

            <Button
                variant='outline'
                onClick={() => { openPredictScore('close')}}
            >
                Clear Response
            </Button>
        </div>
    )
}