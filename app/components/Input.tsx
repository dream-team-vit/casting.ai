import { Button, Group, NativeSelect, NumberInput } from "@mantine/core";

import { TEAMS, VENUES } from "@/utils/contents";
import { useState } from "react";
import { PercentageResultModal } from "./PercentageResultModal";
import { ScoreResultModal } from "./ScoreResultModal";

export default function InputSection() {
  // data
  const [venue, setVenue] = useState<string>("0");
  const [battingTeam, setBattingTeam] = useState<string>("0");
  const [bowlingTeam, setBowlingTeam] = useState<string>("0");
  const [ballsLeft, setBallsLeft] = useState<number>(0);
  const [wicketLeft, setWicketsLeft] = useState<number>(0);
  const [runsLeft, setRunsLeft] = useState(0);
  const [runRate, setRunRate] = useState(0);

  // modals
  const [openPercentageResultModal, setOpenPercentageResultModal] =
    useState(false);
  const [openScoreResultModal, setOpenScoreResultModal] = useState(false);

  return (
    <div className="flex flex-col item-start justify-center gap-4 mt-5 p-4">
      <Group className="flex flex-col justify-center ">
        <NativeSelect
          data={VENUES.map((venue, index) => ({
            value: index.toString(),
            label: venue,
          }))}
          label="Select Match Venue"
          description="Select the match venue"
          sx={{
            width: "100%",
          }}
          value={venue}
          onChange={(e) => setVenue(e.currentTarget.value)}
        />

        <NativeSelect
          data={TEAMS.map((team, idx) => ({
            value: idx.toString(),
            label: team,
          }))}
          label="Batting team"
          description="Select the batting team"
          sx={{
            width: "100%",
          }}
          value={battingTeam}
          onChange={(e) => setBattingTeam(e.currentTarget.value)}
        />

        <NativeSelect
          data={TEAMS.map((team, idx) => ({
            value: idx.toString(),
            label: team,
          }))}
          label="Bowling team"
          description="Select the bowling team"
          sx={{
            width: "100%",
          }}
          value={bowlingTeam}
          onChange={(e) => setBowlingTeam(e.currentTarget.value)}
        />
      </Group>

      <Group className="grid grid-cols-2 ">
        <NumberInput
          defaultValue={0}
          placeholder="No of balls left"
          label="No of balls left"
          min={0}
          value={ballsLeft}
          onChange={(value) => typeof value === "number" && setBallsLeft(value)}
        />

        <NumberInput
          defaultValue={0}
          placeholder="Wickets left"
          label="Wickets left"
          min={0}
          value={wicketLeft}
          onChange={(value) =>
            typeof value === "number" && setWicketsLeft(value)
          }
        />

        <NumberInput
          defaultValue={0}
          placeholder="Runs left"
          label="Runs left"
          min={0}
          value={runsLeft}
          onChange={(value) => typeof value === "number" && setRunsLeft(value)}
        />

        <NumberInput
          defaultValue={0}
          placeholder="RPO"
          label="Runs per Over ~ Run Rate"
          precision={1}
          min={0}
          step={0.1}
          value={runRate}
          onChange={(value) => typeof value === "number" && setRunRate(value)}
        />
      </Group>

      <Group className="gap-4 m-4 justify-center">
        <Button
          variant="outline"
          onClick={() => setOpenPercentageResultModal(true)}
          disabled={
            !(
              ballsLeft !== 0 &&
              wicketLeft !== 0 &&
              runsLeft !== 0 &&
              runRate !== 0
            )
          }
        >
          Show win percentage
        </Button>
        <Button variant="outline" onClick={() => setOpenScoreResultModal(true)}>
          Predict Score
        </Button>
      </Group>

      <PercentageResultModal
        opened={openPercentageResultModal}
        setOpened={setOpenPercentageResultModal}
        ballsLeft={ballsLeft}
        wicketsLeft={wicketLeft}
        runRate={runRate}
        battingTeam={parseInt(battingTeam!)}
        bowlingTeam={parseInt(bowlingTeam!)}
        runsLeft={runsLeft}
        venue={parseInt(venue!)}
      />

      <ScoreResultModal
        opened={openScoreResultModal}
        setOpened={setOpenScoreResultModal}
        bowlingTeam={parseInt(bowlingTeam)}
        battingTeam={parseInt(battingTeam)}
        venue={parseInt(venue)}
      />
    </div>
  );
}
