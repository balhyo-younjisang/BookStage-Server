export class DateService {
  private today = new Date();

  private day;
  private month;
  private year;

  constructor() {
    this.today = new Date();
    this.day = this.today.getDate();
    this.month = this.today.getMonth();
    this.year = this.today.getFullYear();
  }

  getDateByPeriod = (period: string) => {
    if (period === "today") return this.today;
    else if (period === "yesterday") return this.getYesterDay();
    else if (period === "week") return this.getLastWeek();
    else if (period === "month") return this.getLastMonth();
    else if (period === "year") return this.getLastYear();
  };

  getYesterDay = () => {
    return new Date(new Date().setDate(this.day - 1));
  };

  getLastWeek = () => {
    return new Date(new Date().setDate(this.day - 7));
  };

  getLastMonth = () => {
    return new Date(new Date().setMonth(this.month - 1));
  };

  getLastYear = () => {
    return new Date(new Date().setFullYear(this.year - 1));
  };

  leftPad = (value: number) => {
    return value >= 10 ? value : `0${value}`;
  };

  toStringByFormatting = (source: Date, delimiter = "-") => {
    const year = source.getFullYear();
    const month = this.leftPad(source.getMonth() + 1);
    const day = this.leftPad(source.getDate());

    return [year, month, day].join(delimiter);
  };
}
