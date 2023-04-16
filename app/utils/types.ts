export interface ResultModalProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  battingTeam: number;
  bowlingTeam: number;
  venue: number;
}

export interface PredictionRequestBody {
  venue: number;
  batting_team: number;
  bowling_team: number;
  run_left: number;
  ball_left: number;
  wicket_left: number;
  current_runrate: number;
}

export interface ScorePredictionRequestBody {
  venue: number;
  batting_team: number;
  bowling_team: number;
}

export interface PredictionResponse {
  batting_team: number;
  bowling_team: number;
}

export interface ScorePredictionResponse {
  score: number;
}
