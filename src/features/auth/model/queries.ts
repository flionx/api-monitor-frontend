import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth-api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const authKeys = {
    me: ["auth", "me"] as const
};

export function useMe() {
    return useQuery({
        queryKey: authKeys.me,
        queryFn: authApi.me,
        staleTime: 5 * 60_000
    });
}

export function useLogin() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: authApi.login,
        onSuccess: (user) => {
            queryClient.setQueryData(authKeys.me, user);
            router.replace("/overview");
        }
    });
}

export function useRegister() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: authApi.register,
        onSuccess: (user) => {
            queryClient.setQueryData(authKeys.me, user);
            router.replace("/overview");
        }
    });
}

export function useLogout() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: authApi.logout,
        onSuccess: () => {
            router.replace("/login");
            queryClient.clear();
        },
        onError: () => toast.error("Could not log out. Please try again")
    });
}
