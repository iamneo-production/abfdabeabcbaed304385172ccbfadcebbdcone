import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import HomePage from '../components/HomePage';
import AddStudent from '../components/AddStudents';
import DisplayStudents from '../components/DisplayStudents';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { act } from 'react-dom/test-utils';




test('renders_the_welcome_text_within_h2_tag', () => {
  const { getByText } = render(<HomePage />);
  const welcomeTextElement = getByText('Welcome to the Home Page');
  expect(welcomeTextElement).toBeInTheDocument();
  expect(welcomeTextElement.tagName).toBe('H2');
});


test('renders_Add_Student_heading', () => {
  const { getByText } = render(<AddStudent />);
  const headingElement = getByText('Add Student');
  expect(headingElement).toBeInTheDocument();
});


test('updates_input_values_on_change', () => {
  const { getByLabelText } = render(<AddStudent />);
  const testValues = {
    id: '123',
    name: 'John Doe',
    department: 'Computer Science',
    phoneNumber: '1234567890',
  };

  const idInput = getByLabelText('RegistrationId:');
  const nameInput = getByLabelText('Name:');
  const departmentInput = getByLabelText('Department:');
  const phoneNumberInput = getByLabelText('PhoneNumber:');

  fireEvent.change(idInput, { target: { value: testValues.id } });
  fireEvent.change(nameInput, { target: { value: testValues.name } });
  fireEvent.change(departmentInput, { target: { value: testValues.department } });
  fireEvent.change(phoneNumberInput, { target: { value: testValues.phoneNumber } });

  expect(idInput.value).toBe(testValues.id);
  expect(nameInput.value).toBe(testValues.name);
  expect(departmentInput.value).toBe(testValues.department);
  expect(phoneNumberInput.value).toBe(testValues.phoneNumber);
});

test('submits_form_with_input_values', () => {
  const { getByLabelText, getByText } = render(<AddStudent />);
  const testValues = {
    id: '123',
    name: 'John Doe',
    department: 'Computer Science',
    phoneNumber: '1234567890',
  };

  const idInput = getByLabelText('RegistrationId:');
  const nameInput = getByLabelText('Name:');
  const departmentInput = getByLabelText('Department:');
  const phoneNumberInput = getByLabelText('PhoneNumber:');
  const submitButton = getByText('Submit');

  fireEvent.change(idInput, { target: { value: testValues.id } });
  fireEvent.change(nameInput, { target: { value: testValues.name } });
  fireEvent.change(departmentInput, { target: { value: testValues.department } });
  fireEvent.change(phoneNumberInput, { target: { value: testValues.phoneNumber } });
  fireEvent.click(submitButton);

  // Add your assertions here to check if the form data is submitted correctly
});

test('form_inputs_are_initially_empty', () => {
  const { getByLabelText } = render(<AddStudent />);

  const idInput = getByLabelText('RegistrationId:');
  const nameInput = getByLabelText('Name:');
  const departmentInput = getByLabelText('Department:');
  const phoneNumberInput = getByLabelText('PhoneNumber:');

  expect(idInput.value).toBe('');
  expect(nameInput.value).toBe('');
  expect(departmentInput.value).toBe('');
  expect(phoneNumberInput.value).toBe('');
});

test('form_inputs_clear_after_submission', () => {
  const { getByLabelText, getByText } = render(<AddStudent />);
  const testValues = {
    id: '123',
    name: 'John Doe',
    department: 'Computer Science',
    phoneNumber: '1234567890',
  };

  const idInput = getByLabelText('RegistrationId:');
  const nameInput = getByLabelText('Name:');
  const departmentInput = getByLabelText('Department:');
  const phoneNumberInput = getByLabelText('PhoneNumber:');
  const submitButton = getByText('Submit');

  fireEvent.change(idInput, { target: { value: testValues.id } });
  fireEvent.change(nameInput, { target: { value: testValues.name } });
  fireEvent.change(departmentInput, { target: { value: testValues.department } });
  fireEvent.change(phoneNumberInput, { target: { value: testValues.phoneNumber } });
  fireEvent.click(submitButton);

  expect(idInput.value).toBe('');
  expect(nameInput.value).toBe('');
  expect(departmentInput.value).toBe('');
  expect(phoneNumberInput.value).toBe('');
});

it('submits_form_with_correct_values_and_makes_API_call', async () => {
    const mockResponse = {
      status: 200,
      statusText: 'OK',
    };

    // Mock the fetch function to return a successful response
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const consoleSpy = jest.spyOn(console, 'log');

    const { getByLabelText, getByText } = render(<AddStudent />);

    const idInput = getByLabelText('RegistrationId:');
    const nameInput = getByLabelText('Name:');
    const departmentInput = getByLabelText('Department:');
    const phoneNumberInput = getByLabelText('PhoneNumber:');
    const submitButton = getByText('Submit');

    const testValues = {
      id: '123',
      name: 'John Doe',
      department: 'Computer Science',
      phoneNumber: '1234567890',
    };

    fireEvent.change(idInput, { target: { value: testValues.id } });
    fireEvent.change(nameInput, { target: { value: testValues.name } });
    fireEvent.change(departmentInput, { target: { value: testValues.department } });
    fireEvent.change(phoneNumberInput, { target: { value: testValues.phoneNumber } });

    fireEvent.click(submitButton);

    // Wait for the API call to be made and assertions to be completed
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/addStudent',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: testValues.id,
            name: testValues.name,
            department: testValues.department,
            phonenumber: testValues.phoneNumber,
          }),
        })
      );

      // Check if the expected log message is printed
      expect(consoleSpy).toHaveBeenCalledWith('New Student Added');
    });

    // Clean up the mocks after test
    global.fetch.mockRestore();
    consoleSpy.mockRestore();
  });



  it('renders_students_list_on_initial_load', async () => {
    const mockStudents = [
      { id: 1, name: 'John', department: 'Computer Science', phonenumber: '1234567890' },
      { id: 2, name: 'Jane', department: 'Physics', phonenumber: '9876543210' },
    ];
  
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockStudents),
    });
  
    const { getByText } = render(<DisplayStudents />);
  
    // Wait for the API call to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/getAllStudent'
      );
  
      // Check if student names are rendered
      expect(getByText('John')).toBeInTheDocument();
      expect(getByText('Jane')).toBeInTheDocument();
    });
  
    global.fetch.mockRestore();
  });

  
  it('renders_list_of_students_when_searched_data_is_null', async () => {
    const mockStudents = [
      { id: 1, name: 'John', department: 'Computer Science', phonenumber: '1234567890' },
      { id: 2, name: 'Jane', department: 'Physics', phonenumber: '9876543210' },
    ];

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockStudents),
    });

    const { getByText } = render(<DisplayStudents />);

    // Wait for the API call to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);

      // Check if student names are rendered
      expect(getByText('John')).toBeInTheDocument();
      expect(getByText('Jane')).toBeInTheDocument();
    });

    global.fetch.mockRestore();
  });


  
  const server = setupServer(
    rest.post('http://localhost:8080/addStudent', (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ message: 'Student added successfully' }));
    })
  );
  
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  
  test('submits_form_and_adds_student_to_backend', async () => {
    // Spy on console.log
    const consoleLogSpy = jest.spyOn(console, 'log');
  
    const { getByLabelText, getByText } = render(<AddStudent />);
  
    const idInput = getByLabelText('RegistrationId:');
    const nameInput = getByLabelText('Name:');
    const departmentInput = getByLabelText('Department:');
    const phoneNumberInput = getByLabelText('PhoneNumber:');
    const submitButton = getByText('Submit');
  
    const testValues = {
      id: '123',
      name: 'John Doe',
      department: 'Computer Science',
      phoneNumber: '1234567890',
    };
  
    fireEvent.change(idInput, { target: { value: testValues.id } });
    fireEvent.change(nameInput, { target: { value: testValues.name } });
    fireEvent.change(departmentInput, { target: { value: testValues.department } });
    fireEvent.change(phoneNumberInput, { target: { value: testValues.phoneNumber } });
  
    fireEvent.click(submitButton);
  
    // Wait for the API call to be made and assertions to be completed
    await waitFor(() => {
      // Check if the success message is logged
      expect(consoleLogSpy).toHaveBeenCalledWith('New Student Added');
    });
  
    // Clean up the spy
    consoleLogSpy.mockRestore();
  });

