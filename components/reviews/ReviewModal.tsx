import React, { useState } from "react";
import { addReview } from "../../src/api/Reviews";
import { useAggregatedData } from "../../src/hooks/aggregateData";
import { useDateContext } from "../../src/contexts/date/useDateContext";
import { useReviewContext } from "../../src/contexts/reviews/UseReviewContext";
import Grid from "./Grid";
import TextBox from "./TextBox";
import Summary from "./Summary";
import Modal from "../modals/Modal";
import { Section } from "../shared";

type ReviewModal = {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
};

export default function ReviewModal({ visible, onClose, onAdd }: ReviewModal) {
  const [answer, setAnswer] = useState<{ good: string; bad: string; improve: string }>({
    good: "",
    bad: "",
    improve: "",
  });

  const { selectedDate } = useDateContext();
  const { habitGridData, projectTableData } = useAggregatedData();
  const { reviews, dispatch } = useReviewContext();
  const lastReview = reviews && reviews[0]?.response;
  const isAnswered = answer.good !== "" || answer.bad !== "" || answer.improve !== "";

  function handleSave() {
    if (answer) {
      addReview(answer, selectedDate.toISOString().split("T")[0]);
      setAnswer({ good: "", bad: "", improve: "" });
      onClose();
    }
  }

  function handleCancel() {
    onClose();
  }

  const handleChange = (key: string, value: string) => {
    setAnswer((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Modal
      placeholder={"Weekly Review"}
      visible={visible}
      onClose={handleCancel}
      onSave={handleSave}
      size={"large"}
      disabled={!isAnswered}
    >
      {lastReview && <Summary lastReview={lastReview} />}

      {projectTableData.length > 0 && (
        <Grid data={projectTableData} name={"Projects"} selectedDate={selectedDate} />
      )}

      {habitGridData.length > 0 && (
        <Grid data={habitGridData} name={"Habits"} selectedDate={selectedDate} />
      )}
      <Section>
        <TextBox
          value={answer.good}
          question={"What went well last week?"}
          handleChange={handleChange}
          category={"good"}
        />
        <TextBox
          value={answer.bad}
          question={"What did not go well last week?"}
          handleChange={handleChange}
          category={"bad"}
        />
        <TextBox
          value={answer.improve}
          question={"What is your plan to improve this week?"}
          handleChange={handleChange}
          category={"improve"}
        />
      </Section>
    </Modal>
  );
}
