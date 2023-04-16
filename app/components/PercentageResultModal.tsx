import { axiosInstance } from "@/utils/axios";
import { TEAMS } from "@/utils/contents";
import {
  PredictionRequestBody,
  PredictionResponse,
  ResultModalProps,
} from "@/utils/types";
import { Loader, Modal, Text } from "@mantine/core";
import { useQuery } from "react-query";

interface PercentageResultModalProps extends ResultModalProps {
  runsLeft: number;
  ballsLeft: number;
  wicketsLeft: number;
  runRate: number;
}

export const PercentageResultModal: React.FC<PercentageResultModalProps> = ({
  opened,
  ballsLeft,
  battingTeam,
  bowlingTeam,
  runRate,
  runsLeft,
  setOpened,
  venue,
  wicketsLeft,
}) => {
  const fetchPercentageResult = async () => {
    if (
      ballsLeft !== 0 &&
      wicketsLeft !== 0 &&
      runsLeft !== 0 &&
      runRate !== 0
    ) {
      const data: PredictionRequestBody = {
        ball_left: ballsLeft,
        batting_team: battingTeam,
        bowling_team: bowlingTeam,
        current_runrate: runRate,
        run_left: runsLeft,
        venue: venue,
        wicket_left: wicketsLeft,
      };
      return (await axiosInstance.post("/prediction", data))
        .data as PredictionResponse;
    }
  };
  const percentageResult = useQuery("percentageResult", fetchPercentageResult);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Percentage Result"
    >
      <div className="w-full items-center justify-center flex p-10">
        {percentageResult.isLoading && <Loader />}

        {percentageResult.isError && (
          <Text>Sorry, there was error fetching the result</Text>
        )}

        {percentageResult.isFetched && (
          <div>
            <Text>
              Winning Percentage of {TEAMS[battingTeam]} is
              <span className="ml-1 font-bold">
                {percentageResult.data?.batting_team.toFixed(2)}%
              </span>
            </Text>
            <Text>
              Winning Percentage of {TEAMS[bowlingTeam]} is
              <span className="ml-1 font-bold">
                {percentageResult.data?.bowling_team.toFixed(2)}%
              </span>
            </Text>
          </div>
        )}
      </div>
    </Modal>
  );
};
