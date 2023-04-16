import { useState } from "react";
import InputSection from "./Input";
import PredictedScore from "./Score";
import WinPercent from "./Percent";

export default function HomeComponent(){
    const [predictScore, openPredictScore] = useState('close')
    const [winPercent, openWinPercent] = useState('close')

    return(
        <div className='flex gap-20 items-center justify-center'>
            <InputSection 
                openPredictScore = { openPredictScore }
                openWinPercent = { openWinPercent }
            />
            { predictScore === "open" ? <PredictedScore openPredictScore = { openPredictScore } /> : null}
            { winPercent === "open" ? <WinPercent openWinPercent = { openWinPercent } /> : null}
        </div>
    )
}