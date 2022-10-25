import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const roleToNum = (role) => {
  switch (role) {
    case "leader": {
      return 0;
    }
    case "coLeader": {
      return 1;
    }
    case "admin": {
      return 2;
    }
    case "member": {
      return 3;
    }
    default: {
      break;
    }
  }
};

const expectedRoleToRole = (val, attr) => {
  return val[attr] === "-" ? val.role : val[attr];
};

const ascending = (data, attr) => {
  return data.sort(
    (a, b) =>
      roleToNum(expectedRoleToRole(a, attr)) -
      roleToNum(expectedRoleToRole(b, attr))
  );
};

const descending = (data, attr) => {
  return data.sort(
    (a, b) =>
      roleToNum(expectedRoleToRole(b, attr)) -
      roleToNum(expectedRoleToRole(a, attr))
  );
};

const origin = (data) => {
  return data.sort((a, b) => a.donationRank - b.donationRank);
};

const sortData = ({ data }) => {
  const [sortedData, setSortedData] = useState(data);
  const [sortDir, setSortDir] = useState("none");
  const [attr, setAttr] = useState(null);
  const { category } = useParams();

  const handleSort = (e) => {
    const { currentTarget } = e;
    const name = currentTarget.getAttribute("name");
    if (attr && name !== attr) {
      setSortedData(ascending([...data], name));
      setSortDir("ascending");
    } else {
      switch (sortDir) {
        case "none":
          setSortedData(ascending(sortedData, name));
          setSortDir("ascending");
          break;
        case "ascending":
          setSortedData(descending(sortedData, name));
          setSortDir("descending");
          break;
        case "descending":
          setSortedData(origin(sortedData));
          setSortDir("none");
          break;
        default:
          console.error("올바르지 않은 정렬 방향입니다.");
      }
    }
    setAttr(name);
  };

  useEffect(() => {
    setSortedData(data);
    setSortDir("none");
  }, [category]);

  return { sortedData, sortDir, attr, handleSort };
};

export default sortData;
