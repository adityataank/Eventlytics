let eventlyticsPromise: Promise<any> | null = null;

if (typeof window !== "undefined") {
  eventlyticsPromise = import("eventlytics").then((mod) => {
    const Eventlytics = mod.default || mod;
    return new Eventlytics(
      import.meta.env.VITE_PROJECT_TOKEN ?? "",
      import.meta.env.VITE_API_KEY ?? "",
      import.meta.env.VITE_USER_TOKEN ?? ""
    );
  });
}

const track = async (eventName: string, props?: Record<string, unknown>) => {
  if (!import.meta.env.PROD || !eventlyticsPromise) return; // tracking only in production

  try {
    const eventlytics = await eventlyticsPromise; // Ensure `eventlytics` is loaded before using it
    if (!eventlytics) return;
    eventlytics.track(eventName, { ...props });
  } catch (error) {
    console.error("Eventlytics tracking failed:", error);
  }
};

export const Analytics = { track };
