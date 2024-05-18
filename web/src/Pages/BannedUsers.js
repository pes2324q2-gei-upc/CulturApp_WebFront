import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const BannedUsers = ({token}) => {
  const [report, setReport] = useState(null);


  return (
    <div className="content">
      <h1 className="titlesmenusection">Banned Users</h1>
    </div>
  );
};

export default BannedUsers;