import { useNavigate } from "react-router-dom";

const allShips = [
  { name: "First shipment", trackNumber: 1094442 },
  { name: "Second shipment", trackNumber: 9442984 },
  { name: "Third shipment", trackNumber: 7234258 },
  { name: "Fourth shipment", trackNumber: 6636234 },
];

const Ships = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-y-6 pt-10">
      <p>.Click on a shipment to get its details</p>
      <ul className="flex flex-col items-center gap-y-6 text-dark text-lg font-semibold">
        {allShips.map((ship) => (
          <li
            role="button"
            onClick={() =>
              navigate("/shipment-details", {
                state: { shipId: ship.trackNumber },
              })
            }
          >
            {ship.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ships;
