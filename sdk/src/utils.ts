export const getDeviceInfo = () => {
  if (typeof window !== "undefined") {
    const userAgent = navigator.userAgent;
    const width = window.innerWidth;

    let device_type = "Desktop";
    if (width < 768) device_type = "Mobile";
    else if (width < 1024) device_type = "Tablet";

    let browser_name = "Unknown";
    if (/chrome|crios|crmo/i.test(userAgent)) browser_name = "Chrome";
    else if (/firefox|fxios/i.test(userAgent)) browser_name = "Firefox";
    else if (/safari/i.test(userAgent) && !/chrome|crios|crmo/i.test(userAgent))
      browser_name = "Safari";
    else if (/edge|edg/i.test(userAgent)) browser_name = "Edge";
    else if (/opr|opera/i.test(userAgent)) browser_name = "Opera";

    let os = "Unknown";
    if (/windows/i.test(userAgent)) os = "Windows";
    else if (/macintosh|mac os x/i.test(userAgent)) os = "MacOS";
    else if (/android/i.test(userAgent)) os = "Android";
    else if (/linux/i.test(userAgent)) os = "Linux";
    else if (/iphone|ipad|ipod/i.test(userAgent)) os = "iOS";

    return { device_type, browser_name, os };
  }
  return {};
};

export const getLocationString = (location: Record<string, any> | null): string => {
  return location?.city
    ? `${location?.city}, ${location?.region}, ${location.country}`
    : "";
};
