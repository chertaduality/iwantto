import { Form, Modal, Button } from 'react-bootstrap';
import { useRef } from 'react';
import {
  useBudgets,
  UNCATEGORIZED_BUDGET_ID,
} from '../contexts/BudgetsContext';

export default function AddExpenseModal({
  show,
  handleClose,
  defaultBudgetId,
  defaultPrioId,
}) {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const { addExpense, budgets, prio } = useBudgets();
  const prioRef = useRef();
  // const lowPrioId = { name: 'Низкий' };
  // const normalPrioId = { name: 'Средний' };
  // const highPrioId = { name: 'Высокий' };

  function handleSubmit(e) {
    e.preventDefault();
    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
      prio: prio.value,
    });
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Новая хотелка</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Описание</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
            <Form.Label>Приоритет</Form.Label>
            <Form.Select ref={prioRef} defaultValue={defaultPrioId}>
              <option
                key={prio.value}
                value={'Низкий'}
                variant="outline-success"
              >
                Низкий
              </option>
              <option
                key={prio.value}
                value={'Средний'}
                variant="outline-warning"
              >
                Средний
              </option>
              <option
                key={prio.value}
                value={'Высокий'}
                variant="outline-danger"
              >
                Высокий
              </option>
              {/* <option key={prio.id} value={prio.id}>Высокий</option>
              <option key={prio.id} value={prio.id}>Средний</option>
              <option key={prio.id} value={prio.id}>Низкий</option> */}
              {/* {prio.map(prio => (
                <option key={prio.id} value={prio.name}>
                  {prio.name}
                </option>))} */}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Стоимость</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Группа</Form.Label>
            <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
              <option id={UNCATEGORIZED_BUDGET_ID}>Без группы</option>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Добавить
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
