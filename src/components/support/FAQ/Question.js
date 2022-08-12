import { useState } from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

function Question({ data }) {
  // state of question expansion
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`FAQ-question w-full ${expanded ? "expanded" : ""}`}>
      <div
        className="FAQ-question-header flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <p className="sub-title">{data.question}</p>
        <span>{expanded ? <AiFillMinusCircle /> : <AiFillPlusCircle />}</span>
      </div>
      <div className={`FAQ-question-body w-full ${expanded ? "expanded" : ""}`}>
        <p
          className="text"
          dangerouslySetInnerHTML={{ __html: data.answer }}
        ></p>
      </div>
    </div>
  );
}

export default Question;
