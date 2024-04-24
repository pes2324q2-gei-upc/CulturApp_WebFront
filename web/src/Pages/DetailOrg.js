import { useParams } from "react-router-dom";

const DetailOrg = () => {
  let { id } = useParams();

  // Fetch the report details using the id
  // Display the report details

  return (
    <div>
      <h1>Detail Org for ID: {id}</h1>
      {/* Display report details here */}
    </div>
  );
};

export default DetailOrg;