import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('To-Do App', () => {
  test('renders the input field and add button', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByText(/Add/i);

    expect(inputElement).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test('allows the user to add a todo', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByText(/Add/i);

    // Simulate adding a task
    fireEvent.change(inputElement, { target: { value: 'Learn React' } });
    fireEvent.click(addButton);

    // Check if the task is added to the list
    const newTask = screen.getByText(/Learn React/i);
    expect(newTask).toBeInTheDocument();
  });

  test('does not add an empty todo', () => {
    render(<App />);
    const addButton = screen.getByText(/Add/i);

    // Try to add an empty task
    fireEvent.click(addButton);

    // Check if "No tasks added yet" message is still visible
    const noTaskMessage = screen.getByText(/No tasks added yet/i);
    expect(noTaskMessage).toBeInTheDocument();
  });

  test('clears the input field after adding a todo', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByText(/Add/i);

    // Add a task
    fireEvent.change(inputElement, { target: { value: 'Learn Testing' } });
    fireEvent.click(addButton);

    // Check if the input field is cleared
    expect(inputElement.value).toBe('');
  });

  test('allows the user to delete a todo', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByRole(/Add/i);

    // Add a task
    fireEvent.change(inputElement, { target: { value: 'Learn React' } });
    fireEvent.click(addButton);

    // Delete the task
    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);

    // Check if the task is removed from the list
    const deletedTask = screen.queryByText(/Learn React/i); // queryByText returns null if not found
    expect(deletedTask).not.toBeInTheDocument();

    // Check if "No tasks added yet" message is shown
    const noTaskMessage = screen.getByText(/No tasks added yet/i);
    expect(noTaskMessage).toBeInTheDocument();
  });
});
