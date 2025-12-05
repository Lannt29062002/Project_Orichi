import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VolumeDiscountForm from './VolumeDiscountForm';

describe('VolumeDiscountForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ========== BASIC RENDERING TESTS ==========
  describe('Basic Rendering', () => {
    test('renders the form with correct title', () => {
      render(<VolumeDiscountForm />);
      expect(screen.getByText('Create volume discount')).toBeInTheDocument();
    });

    test('renders form sections', () => {
      render(<VolumeDiscountForm />);
      expect(screen.getByText('General')).toBeInTheDocument();
      expect(screen.getByText('Volume discount rule')).toBeInTheDocument();
      expect(screen.getByText('Preview')).toBeInTheDocument();
    });

    test('renders default form values', () => {
      render(<VolumeDiscountForm />);
      const campaignInput = screen.getByPlaceholderText(
        'e.g., Volume discount #2'
      ) as HTMLInputElement;
      expect(campaignInput.value).toBe('Volume discount #2');

      const titleInput = screen.getByPlaceholderText(
        'e.g., Buy more and save'
      ) as HTMLInputElement;
      expect(titleInput.value).toBe('Buy more and save');
    });

    test('renders default options (Single and Duo)', () => {
      render(<VolumeDiscountForm />);
      expect(screen.getByText('OPTION 1')).toBeInTheDocument();
      expect(screen.getByText('OPTION 2')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Single')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Duo')).toBeInTheDocument();
    });

    test('renders save button', () => {
      render(<VolumeDiscountForm />);
      expect(screen.getByRole('button', { name: /Save/ })).toBeInTheDocument();
    });

    test('renders add option button', () => {
      render(<VolumeDiscountForm />);
      expect(screen.getByRole('button', { name: /Add option/ })).toBeInTheDocument();
    });

    test('renders preview table with headers', () => {
      render(<VolumeDiscountForm />);
      const table = screen.getByRole('table');
      expect(within(table).getByText('Title')).toBeInTheDocument();
      expect(within(table).getByText('Discount Type')).toBeInTheDocument();
      expect(within(table).getByText('Quantity')).toBeInTheDocument();
      expect(within(table).getByText('Amount')).toBeInTheDocument();
    });
  });

  // ========== FORM INPUT TESTS ==========
  describe('Form Input Fields', () => {
    test('campaign name input can be changed', async () => {
      const user = userEvent.setup();
      render(<VolumeDiscountForm />);

      const campaignInput = screen.getByPlaceholderText(
        'e.g., Volume discount #2'
      ) as HTMLInputElement;

      await user.clear(campaignInput);
      await user.type(campaignInput, 'New Campaign');

      expect(campaignInput.value).toBe('New Campaign');
    });

    test('title input can be changed', async () => {
      const user = userEvent.setup();
      render(<VolumeDiscountForm />);

      const titleInput = screen.getByPlaceholderText(
        'e.g., Buy more and save'
      ) as HTMLInputElement;

      await user.clear(titleInput);
      await user.type(titleInput, 'New Title');

      expect(titleInput.value).toBe('New Title');
    });

    test('description input can be changed', async () => {
      const user = userEvent.setup();
      render(<VolumeDiscountForm />);

      const descriptionInput = screen.getByPlaceholderText(
        'Apply for all products in store'
      ) as HTMLTextAreaElement;

      await user.clear(descriptionInput);
      await user.type(descriptionInput, 'New Description');

      expect(descriptionInput.value).toBe('New Description');
    });

    test('option title can be changed', async () => {
      const user = userEvent.setup();
      render(<VolumeDiscountForm />);

      const titleInputs = screen.getAllByPlaceholderText('Single, Duo, etc.');
      await user.clear(titleInputs[0]);
      await user.type(titleInputs[0], 'Triple');

      expect((titleInputs[0] as HTMLInputElement).value).toBe('Triple');
    });

    test('option quantity can be changed', async () => {
      const user = userEvent.setup();
      render(<VolumeDiscountForm />);

      const quantityInputs = screen.getAllByRole('spinbutton');
      const firstQuantityInput = quantityInputs[0] as HTMLInputElement;

      await user.clear(firstQuantityInput);
      await user.type(firstQuantityInput, '5');

      expect(firstQuantityInput.value).toBe('5');
    });

    test('option discount type can be changed', async () => {
      const user = userEvent.setup();
      render(<VolumeDiscountForm />);

      const selects = screen.getAllByRole('combobox');
      const discountTypeSelect = selects[0] as HTMLSelectElement;

      await user.selectOptions(discountTypeSelect, '% discount');

      expect(discountTypeSelect.value).toBe('% discount');
    });
  });

  // ========== FIELD ARRAY MANAGEMENT TESTS ==========
  describe('Field Array Management', () => {
    test('adds a new option when Add option button is clicked', async () => {
      const user = userEvent.setup();
      render(<VolumeDiscountForm />);

      expect(screen.getByText('OPTION 1')).toBeInTheDocument();
      expect(screen.getByText('OPTION 2')).toBeInTheDocument();
      expect(screen.queryByText('OPTION 3')).not.toBeInTheDocument();

      const addButton = screen.getByRole('button', { name: /Add option/ });
      await user.click(addButton);

      await waitFor(() => {
        expect(screen.getByText('OPTION 3')).toBeInTheDocument();
      });
    });

    test('adds multiple options sequentially', async () => {
      const user = userEvent.setup();
      render(<VolumeDiscountForm />);

      const addButton = screen.getByRole('button', { name: /Add option/ });

      await user.click(addButton);
      await waitFor(() => expect(screen.getByText('OPTION 3')).toBeInTheDocument());

      await user.click(addButton);
      await waitFor(() => expect(screen.getByText('OPTION 4')).toBeInTheDocument());

      expect(screen.getByText('OPTION 1')).toBeInTheDocument();
      expect(screen.getByText('OPTION 2')).toBeInTheDocument();
      expect(screen.getByText('OPTION 3')).toBeInTheDocument();
      expect(screen.getByText('OPTION 4')).toBeInTheDocument();
    });

    test('removes an option when delete button is clicked', async () => {
      const user = userEvent.setup();
      render(<VolumeDiscountForm />);

      expect(screen.getByText('OPTION 1')).toBeInTheDocument();
      expect(screen.getByText('OPTION 2')).toBeInTheDocument();

      const deleteButtons = screen.getAllByRole('button', { name: /🗑️/ });
      await user.click(deleteButtons[0]);

      // After removing first option, the second becomes first
      await waitFor(() => {
        const options = screen.queryAllByText(/OPTION \d+/);
        expect(options.length).toBe(1);
      }, { timeout: 3000 });
    });

    test('prevents removing the last option by showing error on submit', async () => {
      const user = userEvent.setup();
      render(<VolumeDiscountForm />);

      const deleteButtons = screen.getAllByRole('button', { name: /🗑️/ });
      await user.click(deleteButtons[0]);
      
      await waitFor(() => {
        expect(screen.queryAllByText(/OPTION \d+/).length).toBe(1);
      }, { timeout: 3000 });

      // Click again to remove the last option
      const updatedDeleteButtons = screen.getAllByRole('button', { name: /🗑️/ });
      await user.click(updatedDeleteButtons[0]);

      await waitFor(() => {
        expect(screen.queryAllByText(/OPTION \d+/).length).toBe(0);
      }, { timeout: 3000 });

      const saveButton = screen.getByRole('button', { name: /Save/ });
      await user.click(saveButton);

      await waitFor(() => {
        expect(
          screen.getByText('At least 1 option is required')
        ).toBeInTheDocument();
      });
    });
  });

  // ========== CONDITIONAL RENDERING TESTS ==========
  describe('Conditional Rendering', () => {
    test('shows amount input when discount type is "% discount"', async () => {
      const user = userEvent.setup();
      render(<VolumeDiscountForm />);

      const selects = screen.getAllByRole('combobox');
      const discountTypeSelect = selects[1] as HTMLSelectElement;

      // The second option (Duo) already has discount type set to "% discount"
      expect(discountTypeSelect.value).toBe('% discount');

      // Amount input should be visible
      const amountInputs = screen.getAllByPlaceholderText('10');
      expect(amountInputs.length).toBeGreaterThan(0);
    });

    test('hides amount input when discount type is "None"', () => {
      render(<VolumeDiscountForm />);

      const selects = screen.getAllByRole('combobox');
      const firstDiscountTypeSelect = selects[0] as HTMLSelectElement;

      // First option has discount type "None"
      expect(firstDiscountTypeSelect.value).toBe('None');

      // First option should not have amount input
      const amountInputs = screen.queryAllByPlaceholderText('10');
      expect(amountInputs.length).toBe(1); // Only the second option has amount
    });

    test('toggles amount input visibility when discount type changes', async () => {
      const user = userEvent.setup();
      render(<VolumeDiscountForm />);

      const selects = screen.getAllByRole('combobox');
      const firstDiscountTypeSelect = selects[0] as HTMLSelectElement;

      // Start with "None"
      expect(firstDiscountTypeSelect.value).toBe('None');

      // Change to "% discount"
      await user.selectOptions(firstDiscountTypeSelect, '% discount');

      await waitFor(() => {
        const amountInputs = screen.getAllByPlaceholderText('10');
        expect(amountInputs.length).toBe(2); // Now both options show amount
      });

      // Change back to "None"
      await user.selectOptions(firstDiscountTypeSelect, 'None');

      await waitFor(() => {
        const amountInputs = screen.queryAllByPlaceholderText('10');
        expect(amountInputs.length).toBe(1); // Only second option has amount
      });
    });

    test('shows correct suffix for discount type (% for percentage, $ for fixed)', async () => {
      const user = userEvent.setup();
      render(<VolumeDiscountForm />);

      // Check for % suffix (second option)
      expect(screen.getByText('%')).toBeInTheDocument();

      const selects = screen.getAllByRole('combobox');
      const firstDiscountTypeSelect = selects[0] as HTMLSelectElement;

      await user.selectOptions(firstDiscountTypeSelect, 'Discount / each');

      await waitFor(() => {
        const amountSuffixes = screen.getAllByText('$');
        expect(amountSuffixes.length).toBeGreaterThan(0);
      });
    });
  });

  // ========== PREVIEW TABLE TESTS ==========
  describe('Preview Table', () => {
    test('displays preview data from form fields', () => {
      render(<VolumeDiscountForm />);

      // Check preview contains the data
      expect(screen.getByDisplayValue('Single')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Duo')).toBeInTheDocument();
    });

    test('updates preview when form values change', async () => {
      const user = userEvent.setup();
      render(<VolumeDiscountForm />);

      const titleInputs = screen.getAllByPlaceholderText('Single, Duo, etc.');
      await user.clear(titleInputs[0]);
      await user.type(titleInputs[0], 'Triple Bundle');

      // The preview should update to show the new title
      expect(screen.getByDisplayValue('Triple Bundle')).toBeInTheDocument();
    });

    test('preview shows dash for empty amount fields', () => {
      render(<VolumeDiscountForm />);

      const table = screen.getByRole('table');
      expect(within(table).getByText('-')).toBeInTheDocument();
    });
  });

  // ========== VALIDATION TESTS ==========
  describe('Form Validation', () => {
    test('shows error when campaign name is empty and form is submitted', async () => {
      const user = userEvent.setup();
      render(<VolumeDiscountForm />);

      const campaignInput = screen.getByPlaceholderText(
        'e.g., Volume discount #2'
      ) as HTMLInputElement;

      await user.clear(campaignInput);

      const saveButton = screen.getByRole('button', { name: /Save/ });
      await user.click(saveButton);

      await waitFor(() => {
        expect(
          screen.getByText('Campaign Name is required')
        ).toBeInTheDocument();
      });
    });

    test('shows error when option title is empty', async () => {
      const user = userEvent.setup();
      render(<VolumeDiscountForm />);

      const titleInputs = screen.getAllByPlaceholderText('Single, Duo, etc.');
      await user.clear(titleInputs[0]);

      const saveButton = screen.getByRole('button', { name: /Save/ });
      await user.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText('Title is required')).toBeInTheDocument();
      });
    });

    test('shows error when option quantity is empty', async () => {
      const user = userEvent.setup();
      render(<VolumeDiscountForm />);

      const quantityInputs = screen.getAllByRole('spinbutton');
      const firstQuantityInput = quantityInputs[0] as HTMLInputElement;

      await user.clear(firstQuantityInput);

      const saveButton = screen.getByRole('button', { name: /Save/ });
      await user.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText('Quantity is required')).toBeInTheDocument();
      });
    });

    test('shows error when amount is required but empty', async () => {
      const user = userEvent.setup();
      render(<VolumeDiscountForm />);

      const selects = screen.getAllByRole('combobox');
      const discountTypeSelect = selects[1] as HTMLSelectElement;

      // Second option already has discount type "% discount"
      expect(discountTypeSelect.value).toBe('% discount');

      // Find amount input for second option and clear it
      const amountInputs = screen.getAllByPlaceholderText('10');
      const secondAmountInput = amountInputs[0] as HTMLInputElement;

      await user.clear(secondAmountInput);

      const saveButton = screen.getByRole('button', { name: /Save/ });
      await user.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText('Amount is required')).toBeInTheDocument();
      });
    });

    test('clears validation errors when form is corrected', async () => {
      const user = userEvent.setup();
      render(<VolumeDiscountForm />);

      const campaignInput = screen.getByPlaceholderText(
        'e.g., Volume discount #2'
      ) as HTMLInputElement;
      await user.clear(campaignInput);

      const saveButton = screen.getByRole('button', { name: /Save/ });
      await user.click(saveButton);

      await waitFor(() => {
        expect(
          screen.getByText('Campaign Name is required')
        ).toBeInTheDocument();
      });

      // Fix the error
      await user.type(campaignInput, 'Fixed Campaign');

      // Error should disappear when form re-validates
      expect(
        screen.queryByText('Campaign Name is required')
      ).not.toBeInTheDocument();
    });
  });

  // ========== FORM SUBMISSION TESTS ==========
  describe('Form Submission', () => {
    beforeEach(() => {
      global.fetch = jest.fn();
      global.alert = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('shows loading state when submitting', async () => {
      const user = userEvent.setup();
      (global.fetch as jest.Mock).mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ ok: true, json: () => ({}) }), 100)
          )
      );

      render(<VolumeDiscountForm />);

      const saveButton = screen.getByRole('button', { name: /Save/ });
      await user.click(saveButton);

      expect(screen.getByRole('button', { name: /Saving/ })).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Save/ })).toBeInTheDocument();
      });
    });

    test('calls fetch with correct data on submit', async () => {
      const user = userEvent.setup();
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ id: 1 }),
      });

      render(<VolumeDiscountForm />);

      const saveButton = screen.getByRole('button', { name: /Save/ });
      await user.click(saveButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          'https://jsonplaceholder.typicode.com/posts',
          expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          })
        );
      });
    });

    test('shows success alert when form is submitted successfully', async () => {
      const user = userEvent.setup();
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ id: 1 }),
      });

      render(<VolumeDiscountForm />);

      const saveButton = screen.getByRole('button', { name: /Save/ });
      await user.click(saveButton);

      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith(
          '✅ Volume discount saved successfully!'
        );
      });
    });

    test('shows error message when fetch fails', async () => {
      const user = userEvent.setup();
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({}),
      });

      render(<VolumeDiscountForm />);

      const saveButton = screen.getByRole('button', { name: /Save/ });
      await user.click(saveButton);

      await waitFor(() => {
        expect(
          screen.getByText('Failed to save volume discount')
        ).toBeInTheDocument();
      });
    });

    test('shows error message when network error occurs', async () => {
      const user = userEvent.setup();
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Network error')
      );

      render(<VolumeDiscountForm />);

      const saveButton = screen.getByRole('button', { name: /Save/ });
      await user.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText('Network error')).toBeInTheDocument();
      });
    });

    test('shows error when no options are provided', async () => {
      const user = userEvent.setup();
      render(<VolumeDiscountForm />);

      // Remove all options
      let deleteButtons = screen.getAllByRole('button', { name: /🗑️/ });
      await user.click(deleteButtons[0]);

      await waitFor(() => {
        expect(screen.queryAllByText(/OPTION \d+/).length).toBe(1);
      }, { timeout: 3000 });

      deleteButtons = screen.getAllByRole('button', { name: /🗑️/ });
      await user.click(deleteButtons[0]);

      await waitFor(() => {
        expect(screen.queryAllByText(/OPTION \d+/).length).toBe(0);
      }, { timeout: 3000 });

      const saveButton = screen.getByRole('button', { name: /Save/ });
      await user.click(saveButton);

      await waitFor(() => {
        expect(
          screen.getByText('At least 1 option is required')
        ).toBeInTheDocument();
      });

      // Fetch should not be called
      expect(global.fetch).not.toHaveBeenCalled();
    });

    test('clears previous error message when retrying submission', async () => {
      const user = userEvent.setup();
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({}),
      });

      render(<VolumeDiscountForm />);

      const saveButton = screen.getByRole('button', { name: /Save/ });
      await user.click(saveButton);

      await waitFor(() => {
        expect(
          screen.getByText('Failed to save volume discount')
        ).toBeInTheDocument();
      });

      // Clear the mock and set up success
      jest.clearAllMocks();
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ id: 1 }),
      });

      // Click save again
      await user.click(saveButton);

      await waitFor(() => {
        expect(
          screen.queryByText('Failed to save volume discount')
        ).not.toBeInTheDocument();
        expect(global.alert).toHaveBeenCalledWith(
          '✅ Volume discount saved successfully!'
        );
      });
    });
  });

  // ========== INTEGRATION TESTS ==========
  describe('Integration Tests', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      global.fetch = jest.fn();
      global.alert = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('complete form workflow: add option, fill data, submit', async () => {
      const user = userEvent.setup();
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ id: 1 }),
      });

      render(<VolumeDiscountForm />);

      // Add new option
      const addButton = screen.getByRole('button', { name: /Add option/ });
      await user.click(addButton);

      await waitFor(() => {
        expect(screen.getByText('OPTION 3')).toBeInTheDocument();
      });

      // Fill new option fields
      const titleInputs = screen.getAllByPlaceholderText('Single, Duo, etc.');
      await user.type(titleInputs[2], 'Triple');

      const quantityInputs = screen.getAllByRole('spinbutton');
      await user.clear(quantityInputs[2]);
      await user.type(quantityInputs[2], '3');

      const selects = screen.getAllByRole('combobox');
      await user.selectOptions(selects[2], '% discount');

      const amountInputs = screen.getAllByPlaceholderText('10');
      await user.type(amountInputs[1], '15');

      // Submit form
      const saveButton = screen.getByRole('button', { name: /Save/ });
      await user.click(saveButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
        expect(global.alert).toHaveBeenCalledWith(
          '✅ Volume discount saved successfully!'
        );
      });
    });

    test('form submission with only default options', async () => {
      const user = userEvent.setup();
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ id: 1 }),
      });

      render(<VolumeDiscountForm />);

      const saveButton = screen.getByRole('button', { name: /Save/ });
      await user.click(saveButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
        expect(global.alert).toHaveBeenCalledWith(
          '✅ Volume discount saved successfully!'
        );
      }, { timeout: 3000 });
    });

    test('complete form workflow: modify all fields and submit', async () => {
      const user = userEvent.setup();
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ id: 1 }),
      });

      render(<VolumeDiscountForm />);

      // Modify campaign name
      const campaignInput = screen.getByPlaceholderText(
        'e.g., Volume discount #2'
      ) as HTMLInputElement;
      await user.clear(campaignInput);
      await user.type(campaignInput, 'Updated Campaign');

      // Submit
      const saveButton = screen.getByRole('button', { name: /Save/ });
      await user.click(saveButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
        expect(global.alert).toHaveBeenCalledWith(
          '✅ Volume discount saved successfully!'
        );
      });
    });
  });
});
