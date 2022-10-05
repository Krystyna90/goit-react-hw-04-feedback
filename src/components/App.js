import { useState } from "react";
import FeedbackOptions from "./FeedbackOptions/FeedbackOptions";
import Statistics from "./Statistics/Statistics";
import NoStatistics from "./NoStatistics/NoStatistics";
import Section from "./Section/Section";

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onLeaveFeedback = (e) => {
    const option = e.target.name;

    switch (option) {
      case "good":
        setGood((prevState) => prevState + 1);
        break;

      case "neutral":
        setNeutral((prevState) => prevState + 1);
        break;

      case "bad":
        setBad((prevState) => prevState + 1);
        break;

      default:
        console.log(`No option called ${option}`);
        break;
    }
  };

  const countTotalFeedback = () => good + neutral + bad;

  const countPositiveFeedback = () => {
    const total = countTotalFeedback();
    let result = 0;

    if (total > 0) {
      result = Math.ceil((good / total) * 100);
    }

    return `${result}`;
  };

  return (
    <div className="feedback">
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys({ good, neutral, bad })}
          onLeaveFeedback={onLeaveFeedback}
        ></FeedbackOptions>
      </Section>
      {countTotalFeedback() === 0 ? (
        <NoStatistics message="No feedback given" />
      ) : (
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positiveFeedback={countPositiveFeedback()}
          ></Statistics>
        </Section>
      )}
    </div>
  );
}
