import { 
    ActionIcon,
    Box,
    Button,
    Group,
    NativeSelect,
    NumberInput,
    NumberInputHandlers, 
    rem, 
    Text,
} from '@mantine/core';

import { useState, useRef } from 'react';
import { teamData, venueData } from '@/utils/contents';

export default function InputSection({ openPredictScore, openWinPercent }: any){

    return(
        <div className="flex flex-col item-start justify-center gap-4 mt-5 p-4">
            <Group className='flex flex-col justify-center '>
                <NativeSelect
                data={ venueData }
                label="Select Match Venue"
                description="Select the match venue"
                sx={{
                    width: '100%'
                }}
                />

                <NativeSelect
                data={ teamData }
                label="Batting team"
                description="Select the batting team"
                sx={{
                    width: '100%'
                }}
                />

                <NativeSelect
                data={ teamData }
                label="Bowling team"
                description="Select the bowling team"
                sx={{
                    width: '100%'
                }}
                />
            </Group>
            
            <Group className='grid grid-cols-2 '>
                <NumberInput
                defaultValue={0}
                placeholder="No of balls left"
                label="No of balls left"
                min={0}
                />

                <NumberInput
                defaultValue={0}
                placeholder="Wickets left"
                label="Wickets left"
                min={0}
                />

                <NumberInput
                defaultValue={0}
                placeholder="Runs left"
                label="Runs left"
                min={0}
                />

                <NumberInput
                defaultValue={0}
                placeholder="RPO"
                label="Runs per Over"
                precision={1}
                min={0}
                step={0.1}
                />
            </Group>

            <Group className='gap-4 m-4 justify-center'>
                <Button 
                    variant='outline'
                    onClick={() => {
                        openPredictScore('open')
                        openWinPercent('close')
                    }}
                >
                    Predict Score
                </Button>

                <Button 
                    variant='outline'
                    onClick={() => {
                        openWinPercent('open')
                        openPredictScore('close')
                    }}
                >
                    Show win percentage
                </Button>
            </Group>
        </div>
    )
}