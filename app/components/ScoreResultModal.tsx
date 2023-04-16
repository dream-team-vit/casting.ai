import { axiosInstance } from "@/utils/axios";
import { TEAMS } from "@/utils/contents";
import {
  ResultModalProps,
  ScorePredictionRequestBody,
  ScorePredictionResponse,
} from "@/utils/types";
import { Loader, Modal, Text } from "@mantine/core";
import { useQuery } from "react-query";

export const ScoreResultModal: React.FC<ResultModalProps> = ({
  opened,
  setOpened,
  battingTeam,
  bowlingTeam,
  venue,
}) => {
  const fetchScoreResult = async () => {
    const data: ScorePredictionRequestBody = {
      batting_team: battingTeam,
      bowling_team: bowlingTeam,
      venue: venue,
    };

    return (await axiosInstance.post("/score_prediction", data))
      .data as ScorePredictionResponse;
  };

  const scoreResult = useQuery("scoreResult", fetchScoreResult);

  return (
    <Modal
      title="Score Result"
      opened={opened}
      onClose={() => setOpened(false)}
    >
      <div className="w-full items-center justify-center flex p-10">
        {scoreResult.isLoading && <Loader />}

        {scoreResult.isError && (
          <Text>There was some error fetching the results.</Text>
        )}

        {scoreResult.isFetched && (
          <Text>
            The estimated score of the current bowling team, i.e.{" "}
            {TEAMS[battingTeam]} is {scoreResult.data?.score}
          </Text>
        )}
      </div>
    </Modal>
  );
};
