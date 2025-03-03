import { API_URL } from "./constant";
import { getDeviceInfo, setLocationString } from "./utils";

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
      console.log("debug fetching location !!!!!!!!!!!");
      const response = await fetch("https://speed.cloudflare.com/meta");
      this.location = await response.json();
    } catch (error) {
      console.error("Eventlytics: Failed to fetch location:", error);
    }
  }

  async track(eventName: string, properties?: Record<string, any>) {
    try {
      await this.locationReady;

      if (!this.projectToken) return;

      const { browser_name, device_type, os_name } = getDeviceInfo();
      const location = setLocationString(this.location);
      const commonProps: Record<string, any> = {
        device_type,
        os_name,
        browser_name,
        location,
      };
      if (typeof window !== undefined) {
        commonProps["pathname"] = window.location.pathname;
        commonProps["href"] = window.location.href;
      }

      fetch(`${API_URL}/${this.projectToken}`, {
        method: "POST",
        headers: {
          "Api-Key": this.apiKey,
        },
        body: JSON.stringify({})
      });
    } catch (error) {
      console.log("eventlytics: tracking error - ", error);
    }
  }
}

export default Eventlytics;
