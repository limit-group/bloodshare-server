const prisma = require("../utils/db.utils");

exports.getDonationCentres = async (req, res) => {
  const filters = req.query;
  const data = await prisma.user.findMany({});
  console.log(data);
  const filteredUsers = data.filter((user) => {
    let isValid = true;
    for (key in filters) {
      console.log(key, user[key], filters[key]);
      isValid = isValid && user[key] == filters[key];
    }
    return isValid;
  });
  res.send(filteredUsers);
};

