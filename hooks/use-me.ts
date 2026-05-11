import api from "@/lib/axios";
import { useAuthStore } from "@/store/auth-store";
import useSWR from "swr";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  countryCode: string;
  nationalityId: string;
  avatar: string;
  birthday: string | null;
};

const fetcher = (url: string) => api.get(url).then((r) => r.data.data);

export function useMe() {
  const token = useAuthStore((s) => s.token?.accessToken);
  const isReady = useAuthStore((s) => s.isReady);

  const { data, error, isLoading } = useSWR<User>(
    isReady && token ? "/users/me" : null,
    fetcher,
  );

  return { me: data, error, isLoading };
}
