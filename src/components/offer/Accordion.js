import { MdOutlineAddCircleOutline } from "react-icons/md";
import { GrSubtractCircle } from "react-icons/gr";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useState } from "react";

const Accordion = ({ data }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className="row-span-2 col-span-1">
        <div className="rounded border bg-[#f0f5fe] border-blue-400 py-6 px-6">
          <p className="sub-title">{data?.title}</p>
          <p className="text">{data?.description || "-"}</p>
          {isActive && (
            <p style={{ fontSize: "14px" }} className="mt-4">
              {data?.additional_description || "-"}
            </p>
          )}
          <span>
            {isActive ? (
              <AiFillMinusCircle
                style={{
                  marginLeft: "auto",
                  cursor: "pointer",
                  color: "#175FBE",
                }}
                onClick={() => setIsActive(!isActive)}
              />
            ) : (
              <AiFillPlusCircle
                style={{
                  marginLeft: "auto",
                  cursor: "pointer",
                  color: "#175FBE",
                }}
                onClick={() => setIsActive(!isActive)}
              />
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default Accordion;
