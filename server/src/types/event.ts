export type EventType = {
  name: string;
  location: string;
  properties: { [key: string]: any };
  session_id: string;
};
