import React, { useContext, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';

const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = 'Без группы';

export function useBudgets() {
  return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage('budgets', []);
  const [expenses, setExpenses] = useLocalStorage('expenses', []);
  const [prio, setPrio] = useLocalStorage('prio', []);

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }
  function addExpense({ description, amount, budgetId, prio }) {
    setExpenses((prevExpenses) => {
      return [
        ...prevExpenses,
        { id: uuidV4(), description, amount, budgetId, prio },
      ];
    });
  }
  function addBudget({ name, max }) {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  }
  function deleteBudget({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });

    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }
  function deleteExpense({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }

  const done = ({ id }) => {
    setExpenses((expense) => {
      if (expense.id === id) {
        return {
          ...expense,
          complete: !expense.complete,
        };
      }
      return expense;
    });
  };
  // function doneExpense({id}) {
  //   setExpenses(
  //     expenses.map(id => {
  //       if (expenses.id === id) {
  //         return {
  //           ...expenses,
  //           complete: !expenses.complete,
  //         }
  //       }
  //       return expenses
  //     }),
  //   )
  // }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        prio,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
        done,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
