import React from 'react';
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

  const onSubmit = (data: VolumeDiscountFormData) => {
    console.log('Form Data:', data);
    alert('Form submitted! Check console for details.');
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
        <div className="form-content">
          {/* Left Column - Form */}
          <div className="form-left">
            <h2>Create volume discount</h2>

            {/* General Section */}
            <div className="form-section">
              <h3>General</h3>

              <div className="form-group">
                <label>Campaign</label>
                <Controller
                  name="campaignName"
                  control={control}
                  rules={{ required: 'Campaign Name không được trống' }}
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
                  rules={{ required: 'Title không được trống' }}
                  render={({ field }) => (
                    <>
                      <input
                        type="text"
                        {...field}
                        placeholder="e.g., Buy more and save"
                        className={errors.title ? 'input-error' : ''}
                      />
                      {errors.title && <span className="error">{errors.title.message}</span>}
                    </>
                  )}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: 'Description không được trống' }}
                  render={({ field }) => (
                    <>
                      <textarea
                        {...field}
                        placeholder="Apply for all products in store"
                        className={errors.description ? 'input-error' : ''}
                      />
                      {errors.description && <span className="error">{errors.description.message}</span>}
                    </>
                  )}
                />
              </div>
            </div>

            {/* Volume discount rule Section */}
            <div className="form-section">
              <h3>Volume discount rule</h3>

              {fields.map((field, index) => (
                <div key={field.id} className={`option-card ${index % 2 === 0 ? 'option-1' : 'option-2'}`}>
                  <div className="option-header">
                    <span className="option-badge">OPTION {index + 1}</span>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => index > 1 && remove(index)}
                      disabled={index < 2}
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
                        rules={{ required: 'Title không được trống' }}
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
                        rules={{ required: 'Quantity không được trống' }}
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

                    {/* Discount Size */}
                    <div className="form-group">
                      <label>Discount size</label>
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
                        <Controller
                          name={`options.${index}.amount`}
                          control={control}
                          rules={{ required: 'Amount không được trống' }}
                          render={({ field }) => (
                            <>
                              <input
                                type="number"
                                {...field}
                                placeholder="10"
                                className={errors.options?.[index]?.amount ? 'input-error' : ''}
                              />
                              {errors.options?.[index]?.amount && (
                                <span className="error">{errors.options[index]?.amount?.message}</span>
                              )}
                            </>
                          )}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <button type="button" className="add-option-btn" onClick={addOption}>
                ➕ Add option
              </button>
            </div>

            {/* Save Button */}
            <button type="submit" className="save-btn">
              ✅ Save
            </button>
          </div>

          {/* Right Column - Preview */}
          <div className="form-right">
            <h3>Preview</h3>
            <div className="preview-section">
              <div className="preview-header">Buy more and save</div>
              <div className="preview-subheader">Apply for all products in store</div>

              <div className="preview-options">
                {fields.map((field, index) => (
                  <div key={field.id} className="preview-option">
                    <div className="preview-title">{formData.options[index]?.title}</div>
                    <div className="preview-content">
                      <div>
                        <span className="preview-label">Discount Type</span>
                        <span className="preview-value">{formData.options[index]?.discountSize}</span>
                      </div>
                      <div>
                        <span className="preview-label">Quantity</span>
                        <span className="preview-value">{formData.options[index]?.quantity}</span>
                      </div>
                      {formData.options[index]?.amount && (
                        <div>
                          <span className="preview-label">Amount</span>
                          <span className="preview-value">{formData.options[index]?.amount}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VolumeDiscountForm;
