export type SpecialMonth = {
  theme:     string;
  emoji:     string;
  accent:    string;
  eventName: string;
};

export type MonthStatus = 'past' | 'current' | 'upcoming';


export type MeetingDay = {
  date:      Date;
  isSpecial: boolean;
  special?:  SpecialMonth;
  label:     string;
  status: MonthStatus;
};