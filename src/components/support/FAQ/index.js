import questions from "data/questions.json";
import Question from "./Question";

function FAQ() {
  return (
    <div className="FAQ Section padding-x w-full">
      <h3 className="title primary">Frequently Asked Questions</h3>
      <div className="FAQ-wrapper flex flex-col row-gap items-center w-full">
        <div className="line w-full"></div>
        {questions.map((question, i) => (
          <Question key={i} data={question} />
        ))}
      </div>
    </div>
  );
}

export default FAQ;
