import { render } from "../../utilities/test-utils";
import { calculate } from "../../utilities/calculations-utils";
import { getElement, getAllElements } from "../../utilities/test-utils";
import App from "../../../App";

describe("Balance Component", () => {
  test("gives correct amounts for Months component to display", () => {
    render(<App />);
    calculate({
      incomeAmounts: ['98', '102', '3,578'],
      expenseAmounts: ['92', '143', '3,569'],
      balance: '673',
    });

    expect(getElement("$647")).toBeInTheDocument();
    expect(getElement("$621")).toBeInTheDocument();
    expect(getElement("$595")).toBeInTheDocument();
    expect(getElement("$569")).toBeInTheDocument();
    expect(getElement("$543")).toBeInTheDocument();
    expect(getElement("$517")).toBeInTheDocument();
  });
  test("gives correct dates for Months component to display", () => {
    render(<App />);

    const dateFormatter = new Intl.DateTimeFormat("default", {
      month: "long",
      year: "numeric",
    });
    const monthInMils = 2629800000;
    const getDate = (monthsPassed: number): string => {
      return dateFormatter.format(Date.now() + monthInMils * monthsPassed);
    }

    calculate({
      incomeAmounts: '1',
      expenseAmounts: '2',
      balance: '10'
    });

    expect(getElement("This Month")).toBeInTheDocument();
    expect(getElement("Next Month")).toBeInTheDocument();
    expect(getElement(getDate(2))).toBeInTheDocument();
    expect(getElement(getDate(3))).toBeInTheDocument();
    expect(getElement(getDate(4))).toBeInTheDocument();
    expect(getElement(getDate(5))).toBeInTheDocument();
  });
  test("gives correct differences for Months component to display", () => {
    render(<App />);

    calculate({
      incomeAmounts: ['5294', '78', '3', '579', '2048'],
      expenseAmounts: '10000',
      balance: '4392'
    });

    expect(getAllElements("Which is $1,998 lower than last month")).toHaveLength(6);
  });
});