import { getDeviceInfo, setLocationString } from "./utils";

class Eventlytics {
  private projectToken: string;
  private location: Record<string, any> | null = null;
  private locationReady: Promise<void>; // Promise to track readiness

  constructor(projectToken: string) {
    this.projectToken = projectToken;
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
      console.log("eventlytics version 2", {
        eventName,
        location,
        props: {
          ...commonProps,
          ...properties,
        },
        token: this.projectToken,
      });
    } catch (error) {
      console.log("eventlytics: tracking error - ", error);
    }
  }
}

export default Eventlytics;
