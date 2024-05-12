import React, { useState } from "react";
import { addReview } from "../../src/api/SupabaseReviews";
import { useAggregatedData } from "../../src/hooks/aggregateData";
import { useDateContext } from "../../src/contexts/date/useDateContext";
import { useReviewContext } from "../../src/contexts/reviews/UseReviewContext";
import Grid from "../reviews/Grid";
import TextBox from "../reviews/TextBox";
import Summary from "../reviews/Summary";
import Modal from "../shared/Modal";

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
  const lastReview = reviews[0].response;
  const isAnswered = answer.good !== "" || answer.bad !== "" || answer.improve !== "";

  function handleSave() {
    console.log(answer);
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
    >
      {lastReview && <Summary lastReview={lastReview} />}

      {projectTableData && (
        <Grid data={projectTableData} name={"Projects"} selectedDate={selectedDate} />
      )}

      {projectTableData && (
        <Grid data={habitGridData} name={"Habits"} selectedDate={selectedDate} />
      )}
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
    </Modal>
  );
}
