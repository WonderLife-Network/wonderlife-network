import { apiLog } from "@/lib/apiLogger";

export async function handleApiError(
    route: string,
    method: string,
    error: any,
    userId?: string,
    ip?: string
) {
    await apiLog(route, method, 500, userId, ip, {
        error: error?.message || "Unknown API Error",
    });

    return Response.json(
        {
            success: false,
            error: error?.message || "Serverfehler",
        },
        { status: 500 }
    );
}
