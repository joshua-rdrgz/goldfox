import { render } from "../../utilities/test-utils";
import { calculate } from "../../utilities/calculations-utils";
import { getElement } from "../../utilities/test-utils";
import App from "../../../App";

describe("Month component", () => {
  test(`will correctly show warning and error messages and styles when net worth levels are 0 and below`, () => {
    render(<App />);
    calculate({ incomeAmounts: '1', expenseAmounts: '2', balance: '5'});

    expect(getElement("You've got no money!")).toBeInTheDocument();
    expect(getElement("You're in the negative!")).toBeInTheDocument();
  });
});
