import { API_URL } from "./constant";
import { getDeviceInfo, getLocationString } from "./utils";

class Eventlytics {
  private projectToken: string;
  private apiKey: string;
  private location: Record<string, any> | null = null;
  private locationReady: Promise<void>; // Promise to track readiness

  constructor(projectToken: string, apiKey: string) {
    this.projectToken = projectToken;
    this.apiKey = apiKey;
    this.locationReady = this.initialize();
  }

  private async initialize() {
    try {
      const response = await fetch("https://speed.cloudflare.com/meta");
      this.location = await response.json();
    } catch (error) {
      console.error("Eventlytics: Failed to fetch location:", error);
    } finally {
      return;
    }
  }

  async track(eventName: string, properties?: Record<string, any>) {
    try {
      await this.locationReady;

      if (!this.projectToken || !this.apiKey) return;

      const { browser_name, device_type, os } = getDeviceInfo();
      const location = getLocationString(this.location);
      const commonProps: Record<string, any> = {
        device_type,
        os,
        browser_name,
      };
      if (typeof window !== "undefined") {
        commonProps["pathname"] = window.location.pathname;
        commonProps["href"] = window.location.href;
      }

      const payload = {
        name: eventName,
        location: location,
        properties: {
          ...commonProps,
          ...properties,
        },
      };

      fetch(`${API_URL}/${this.projectToken}`, {
        method: "POST",
        headers: {
          "Api-Key": this.apiKey,
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.log("eventlytics: tracking error - ", error);
    }
  }
}

export default Eventlytics;
