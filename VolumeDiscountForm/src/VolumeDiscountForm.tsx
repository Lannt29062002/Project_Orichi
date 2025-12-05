import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import './VolumeDiscountForm.css';

interface DiscountOption {
  title: string;
  subtitle: string;
  label?: string;
  quantity?: number;
  discountSize?: string;
  amount?: string | number;
}

interface VolumeDiscountFormData {
  campaignName: string;
  title: string;
  description: string;
  options: DiscountOption[];
}

const VolumeDiscountForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { control, handleSubmit, formState: { errors }, watch } = useForm<VolumeDiscountFormData>({
    defaultValues: {
      campaignName: 'Volume discount #2',
      title: 'Buy more and save',
      description: 'Apply for all products in store',
      options: [
        { title: 'Single', subtitle: 'Standalone price', quantity: 1, discountSize: 'None' },
        { title: 'Duo', subtitle: 'Save 10%', quantity: 2, discountSize: '% discount', amount: 10 }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options'
  });

  const formData = watch();

  const onSubmit = async (data: VolumeDiscountFormData) => {
    setSubmitError(null);

    // Validate minimum 1 option
    if (data.options.length === 0) {
      setSubmitError('At least 1 option is required');
      return;
    }

    try {
      setIsLoading(true);

      // Simulate API call
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: data.campaignName,
          body: JSON.stringify(data),
          userId: 1,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save volume discount');
      }

      const result = await response.json();
      console.log('API Response:', result);
      alert('✅ Volume discount saved successfully!');
    } catch (error) {
      console.error('Error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to save. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const addOption = () => {
    const newOption: DiscountOption = {
      title: '',
      subtitle: '',
      quantity: fields.length + 1,
      discountSize: 'None'
    };
    append(newOption);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-header">
          <button type="button" className="back-btn" onClick={() => window.history.back()}>
            ←
          </button>
          <h2>Create volume discount</h2>
        </div>
        <div className="form-content">
          {/* Left Column - Form */}
          <div className="form-left">

            {/* General Section */}
            <div className="form-section">
              <div className="form-section-content">
                <h3>General</h3>

                <div className="form-group">
                <label>Campaign</label>
                <Controller
                  name="campaignName"
                  control={control}
                  rules={{ required: 'Campaign Name is required' }}
                  render={({ field }) => (
                    <>
                      <input
                        type="text"
                        {...field}
                        placeholder="e.g., Volume discount #2"
                        className={errors.campaignName ? 'input-error' : ''}
                      />
                      {errors.campaignName && <span className="error">{errors.campaignName.message}</span>}
                    </>
                  )}
                />
              </div>

              <div className="form-group">
                <label>Title</label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      placeholder="e.g., Buy more and save"
                    />
                  )}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      placeholder="Apply for all products in store"
                    />
                  )}
                />
              </div>
              </div>
            </div>

            {/* Volume discount rule Section */}
            <div className="form-section">
             
                <h4>Volume discount rule</h4>

                {fields.map((field, index) => (
                <div key={field.id} className={`option-card ${index % 2 === 0 ? 'option-1' : 'option-2'}`}>
                  <div className="option-header">
                    <span className="option-badge">OPTION {index + 1}</span>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => remove(index)}
                    >
                      🗑️
                    </button>
                  </div>

                  <div className="option-grid">
                    {/* Title */}
                    <div className="form-group">
                      <label>Title</label>
                      <Controller
                        name={`options.${index}.title`}
                        control={control}
                        rules={{ required: 'Title is required' }}
                        render={({ field }) => (
                          <>
                            <input
                              type="text"
                              {...field}
                              placeholder="Single, Duo, etc."
                              className={errors.options?.[index]?.title ? 'input-error' : ''}
                            />
                            {errors.options?.[index]?.title && (
                              <span className="error">{errors.options[index]?.title?.message}</span>
                            )}
                          </>
                        )}
                      />
                    </div>

                    {/* Subtitle */}
                    <div className="form-group">
                      <label>Subtitle</label>
                      <Controller
                        name={`options.${index}.subtitle`}
                        control={control}
                        render={({ field }) => (
                          <input
                            type="text"
                            {...field}
                            placeholder="e.g., Save 10%"
                          />
                        )}
                      />
                    </div>

                    {/* Label Optional */}
                    <div className="form-group">
                      <label>Label (optional)</label>
                      <Controller
                        name={`options.${index}.label`}
                        control={control}
                        render={({ field }) => (
                          <input
                            type="text"
                            {...field}
                            placeholder="e.g., Popular"
                          />
                        )}
                      />
                    </div>

                    {/* Quantity */}
                    <div className="form-group">
                      <label>Quantity</label>
                      <Controller
                        name={`options.${index}.quantity`}
                        control={control}
                        rules={{ required: 'Quantity is required' }}
                        render={({ field }) => (
                          <>
                            <input
                              type="number"
                              {...field}
                              min="1"
                              className={errors.options?.[index]?.quantity ? 'input-error' : ''}
                            />
                            {errors.options?.[index]?.quantity && (
                              <span className="error">{errors.options[index]?.quantity?.message}</span>
                            )}
                          </>
                        )}
                      />
                    </div>

                    {/* Discount Type */}
                    <div className="form-group">
                      <label>Discount type</label>
                      <Controller
                        name={`options.${index}.discountSize`}
                        control={control}
                        render={({ field }) => (
                          <select {...field}>
                            <option>None</option>
                            <option>% discount</option>
                            <option>Discount / each</option>
                          </select>
                        )}
                      />
                    </div>

                    {/* Amount */}
                    {formData.options[index]?.discountSize !== 'None' && (
                      <div className="form-group">
                        <label>Amount</label>
                        <div className="amount-input-wrapper">
                          <div>
                            <Controller
                              name={`options.${index}.amount`}
                              control={control}
                              rules={{ required: 'Amount is required' }}
                              render={({ field }) => (
                              <>
                                <input
                                  type="number"
                                  {...field}
                                  placeholder="10"
                                  className={errors.options?.[index]?.amount ? 'input-error' : ''}
                                />
                                <span className="amount-suffix">
                                  {formData.options[index]?.discountSize === '% discount' ? '%' : '$'}
                                </span>
                              </>
                            )}
                            />
                          </div>
                          {errors.options?.[index]?.amount && (
                            <span className="error">{errors.options[index]?.amount?.message}</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <button type="button" className="add-option-btn" onClick={addOption}>
                ➕ Add option
              </button>
              
            </div>

            {/* Error Message */}
            {submitError && (
              <div className="submit-error">
                {submitError}
              </div>
            )}

            {/* Save Button */}
            <button type="submit" className="save-btn" disabled={isLoading}>
              {isLoading ? '⏳ Saving...' : '✅ Save'}
            </button>
          </div>

          {/* Right Column - Preview */}
          <div className="form-right">
            <h3>Preview</h3>
            <div className="preview-section">
              <div className="preview-header">Buy more and save</div>
              <div className="preview-subheader">Apply for all products in store</div>

              <table className="preview-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Discount Type</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((field, index) => (
                    <tr key={field.id}>
                      <td>{formData.options[index]?.title}</td>
                      <td>{formData.options[index]?.discountSize}</td>
                      <td>{formData.options[index]?.quantity}</td>
                      <td>
                        {formData.options[index]?.amount ? (
                          <>
                            {formData.options[index]?.amount}
                            {formData.options[index]?.discountSize === '% discount' ? '%' : '$'}
                          </>
                        ) : (
                          '-'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VolumeDiscountForm;
