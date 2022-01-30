import { useQuery } from "react-query";

import apiClient from "../../services/apiClient";

export default function useFetchShipDetails(shipId) {
  return useQuery(["shipDetails", shipId], () =>
    apiClient
      .get(`shipments/track/${shipId}`)
      .then(({ data }) => data)
      .catch((e) => e)
  );
}
