import { Button } from "components";
import { useRouter } from "next/router";
// import roles from "data/roles.json";
import { MdArrowForward } from "react-icons/md";

import { useState, useEffect } from "react";
import { STRAPI_API_URL } from "lib/constants";
function OpenRoles() {
  // next.js router
  const router = useRouter();

  const [roles, setRoles] = useState([]);

  const getRoles = async () => {
    try {
      const res = await fetch(`${STRAPI_API_URL}/api/joblistings`, {
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
      });
      const temp = await res.json();
      if (temp.data) {
        setRoles(temp.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getRoles();
  }, []);

  return (
    <div className="OpenRoles Section w-full padding-x">
      <div className="OpenRoles-header w-full flex flex-col items-start">
        <h3 className="title primary">Find open roles</h3>
        <div className="OpenRoles-header-sub flex flex-col items-start w-full row-gap-s">
          <p className="text">
            We need bold people who can build with heart, who will chase
            solutions with fearless optimism. <br />
            We are Pickmeup. Are you?
          </p>
          <div className="button-wrapper flex items-center justify-end w-full">
            <Button type="primary" onClick={() => router.push("/careers/jobs")}>
              View all roles
              <span>
                <MdArrowForward />
              </span>
            </Button>
          </div>
        </div>
        <div className="line"></div>
      </div>
      <div className="OpenRoles-body flex flex-col items-center w-full row-gap">
        {roles.slice(0, 5).map((role, i) => (
          <div
            key={i}
            className="OpenRoles-role flex items-center justify-between w-full"
          >
            <div className="OpenRoles-role-name flex flex-col items-start justify-center">
              <p className="sub-title">{role?.attributes?.name}</p>
              <p className="mini-title hide-for-desktop">
                {role?.attributes?.location}
              </p>
            </div>
            <div className="OpenRoles-role-location hide-for-mobile text-center flex items-center justify-center">
              <p className="text text-center">{role?.attributes?.location}</p>
            </div>
            <div className="OpenRoles-role-button flex items-center justify-end">
              <Button
                type="secondary"
                onClick={() =>
                  router.push({
                    pathname: `/careers/jobs/${role.id}`,
                  })
                }
              >
                View Job
                <span>
                  <MdArrowForward />
                </span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OpenRoles;
