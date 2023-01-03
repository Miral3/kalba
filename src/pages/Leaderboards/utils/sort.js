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

export const ascending = (data, attr) => {
  return data.sort(
    (a, b) =>
      roleToNum(expectedRoleToRole(a, attr)) -
      roleToNum(expectedRoleToRole(b, attr))
  );
};

export const descending = (data, attr) => {
  return data.sort(
    (a, b) =>
      roleToNum(expectedRoleToRole(b, attr)) -
      roleToNum(expectedRoleToRole(a, attr))
  );
};

export const origin = (data) => {
  return data.sort((a, b) => a.donationRank - b.donationRank);
};
