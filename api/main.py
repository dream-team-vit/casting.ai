import os
from pydantic import BaseModel
from fastapi import FastAPI
import pickle
import pandas as pd

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Casting.AI API"}

# Types/Models
class PredictionRequestBody(BaseModel):
    venue: int
    batting_team: int
    bowling_team: int
    run_left: int
    ball_left: int
    wicket_left: int
    current_runrate: int
    

class ScorePredictionRequestBody(BaseModel):
    venue: int
    batting_team: int
    bowling_team: int
    

# Importing ML Models
PREDICTION_MODEL_1 = pickle.load(open(os.path.join(os.getcwd(),'models', 'gb_rr'), 'rb'))
PREDICTION_MODEL_2 = pickle.load(open(os.path.join(os.getcwd(),'models','gb_x'), 'rb'))
PREDICTION_MODEL_3 = pickle.load(open(os.path.join(os.getcwd(),'models','rf_rr'), 'rb'))
PREDICTION_MODEL_4 = pickle.load(open(os.path.join(os.getcwd(),'models','rf_x'), 'rb'))
SCORE_PREDICTION_MODEL = pickle.load(open(os.path.join(os.getcwd(),'models','Score_pred'), 'rb'))

@app.post("/prediction")
async def prediction(body: PredictionRequestBody):
    required_runrate = (body.run_left/body.ball_left)*6
    i=0.3*PREDICTION_MODEL_2.predict_proba([[body.batting_team, body.bowling_team, body.venue, body.run_left, body.ball_left, body.wicket_left]])+0.7*PREDICTION_MODEL_4.predict_proba([[body.batting_team, body.bowling_team, body.venue, body.run_left, body.ball_left, body.wicket_left]])
    j=0.3*PREDICTION_MODEL_1.predict_proba([[body.batting_team, body.bowling_team, body.venue, required_runrate, body.current_runrate]])+0.7*PREDICTION_MODEL_3.predict_proba([[body.batting_team, body.bowling_team, body.venue, required_runrate, body.current_runrate]])
    final = 0.6*j+0.4*i
    final_prediction = final*100
    win_prediction = {
		'batting_team' : final_prediction[0][0],
		'bowling_team' : final_prediction[0][1],
	}
    return win_prediction



@app.post("/score_prediction")
async def score_prediction(body: ScorePredictionRequestBody):
    data = pd.DataFrame({'batting_team': [body.batting_team], 'bowling_team': [body.bowling_team], 'venue':[body.venue]})
    predicted_score = round(SCORE_PREDICTION_MODEL.predict(data)[0].item())
    return {"score": predicted_score}