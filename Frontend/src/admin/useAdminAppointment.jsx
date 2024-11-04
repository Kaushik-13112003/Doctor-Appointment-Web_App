import { useQuery } from "@tanstack/react-query";

const fetchAdminAppointments = async () => {
  const res = await fetch(`/api/admin/all-appointments`);
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  return data.allAppointment;
};

const useAdminAppointments = () => {
  return useQuery({
    queryKey: ["admin-appointment"],
    queryFn: fetchAdminAppointments,
    staleTime: 1000 * 60 * 5, // Data remains fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // Data cached for 30 minutes after stale
    refetchOnWindowFocus: false, // Prevents unnecessary refetch on window focus
  });
};

export default useAdminAppointments;
