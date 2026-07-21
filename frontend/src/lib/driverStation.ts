export async function getNetworkConnected(): Promise<boolean> {
    const res = await fetch("/api/");
    const data = await res.json();

    return data.connected;
}

export async function getEnabled(): Promise<boolean> {
    const res = await fetch("/api/");
    const data = await res.json();

    return data.enabled;
}

export function setEnabled(enabled: boolean): void {
    fetch("/api/", {
        method: "POST",
        body: JSON.stringify({
            enabled: enabled,
        }),
    });
}