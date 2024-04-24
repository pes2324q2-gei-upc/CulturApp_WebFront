import { useParams } from "react-router-dom";

const DetailUser = () => {
  let { id } = useParams();

  // Fetch the report details using the id
  // Display the report details

  return (
    <div>
      <h1>Detail User for ID: {id}</h1>
      {/* Display report details here */}
    </div>
  );
};

export default DetailUser;