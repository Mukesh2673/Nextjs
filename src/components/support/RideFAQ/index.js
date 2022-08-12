import questions from "data/rideFAQ.json";
import Question from "./Question";

function RideFAQ() {
  return (
    <div className="FAQ Section padding-x w-full">
      <h3 className="title primary mb-4">Airport Ride FAQ </h3>
      <div className="line w-full"></div>

      <div className="FAQ-wrapper flex flex-col row-gap items-center w-full">
        {questions.map((question, i) => (
          <Question key={i} data={question} />
        ))}
      </div>
    </div>
  );
}

export default RideFAQ;
