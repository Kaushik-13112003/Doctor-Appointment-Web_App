import { useQuery } from "@tanstack/react-query";

const fetchDoctorAppointments = async (doctorId) => {
  const res = await fetch(`/api/doctor/doctor-appointments?id=${doctorId}`);
  if (!res.ok) throw new Error("Failed to fetch appointments");
  const data = await res.json();
  return data.allAppointment;
};

const useDoctorAppointments = (doctorId) => {
  return useQuery({
    queryKey: ["doctor-appointment", doctorId],
    queryFn: () => fetchDoctorAppointments(doctorId),
    enabled: !!doctorId, // Only run when doctorId is available
    staleTime: 1000 * 60 * 5, // Data remains fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // Data cached for 30 minutes after stale
    refetchOnWindowFocus: false,
  });
};

export default useDoctorAppointments;
