# Volume Discount Form

Ứng dụng React sử dụng **react-hook-form** để tạo form quản lý discount theo số lượng (volume discount).

## 📋 Yêu cầu

1. **Discount Type**: 
   - None: Không có discount
   - % discount: Giảm theo phần trăm
   - Discount / each: Giảm theo từng sản phẩm

2. **Validation**:
   - Campaign Name, Title, Rules phải điền
   - Quantity, Amount trong Option không được trống và phải là số
   - Title trong Option không được trống

3. **Dynamic Options**:
   - Form default có 2 option
   - Mỗi khi thêm option, quantity sẽ tự tăng thêm 1
   - Có thể xoá option (trừ 2 option mặc định)

4. **Preview**:
   - Hiển thị preview theo real-time khi người dùng nhập dữ liệu
   - Preview thay đổi ngay khi nội dung trong Option thay đổi

5. **Save**:
   - Validate toàn bộ form
   - Submit dữ liệu (hiện tại in ra console và alert)
   - Sau khi validate thành công gọi API

## 🎯 Tính năng chính

✅ **Dynamic Options**: Thêm/xoá option động  
✅ **Real-time Preview**: Cập nhật preview khi nhập liệu  
✅ **Form Validation**: Kiểm tra toàn bộ fields  
✅ **Conditional Fields**: Amount chỉ hiển thị khi discount != 'None'  
✅ **React Hook Form**: Quản lý form state hiệu quả  
✅ **Responsive Design**: Hỗ trợ desktop và mobile  

## 📦 Cài đặt

```bash
cd d:\Project_Orichi\VolumeDiscountForm
npm install
npm start
```

## 🏗️ Cấu trúc thư mục

```
VolumeDiscountForm/
├── public/
│   └── index.html
├── src/
│   ├── VolumeDiscountForm.tsx      # Main form component
│   ├── VolumeDiscountForm.css      # Form styles
│   ├── App.tsx                      # App wrapper
│   ├── App.css
│   ├── index.tsx                    # React root
│   └── index.css
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Thiết kế

- **Layout 2 cột**: Form bên trái, Preview bên phải (sticky)
- **Color scheme**: Màu đỏ (#ef4444) cho CTA buttons
- **Responsive**: Chuyển sang single column trên mobile

## 📝 Component Details

### VolumeDiscountForm.tsx

**State:**
- `discountType`: Loại discount (none, percent, fixed)
- `formData`: Dữ liệu form real-time từ `watch()`

**Methods:**
- `onSubmit()`: Submit form với validation
- `addOption()`: Thêm option mới
- `getDiscountTypeLabel()`: Lấy nhãn discount type

**Features:**
- Sử dụng `useFieldArray` để quản lý dynamic array options
- Sử dụng `Controller` để control từng field
- Real-time validation errors
- Conditional rendering cho Amount field

## 🔧 Cách thêm API Integration

Hiện tại form chỉ in dữ liệu lên console. Để integrate API:

```typescript
const onSubmit = async (data: VolumeDiscountFormData) => {
  try {
    const response = await fetch('/api/discount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    console.log('API Response:', result);
  } catch (error) {
    console.error('API Error:', error);
  }
};
```

## 📱 Responsive Breakpoints

- **Desktop**: 1400px max-width, 2-column layout
- **Tablet**: 1024px, single column
- **Mobile**: Option grid switches to 1 column

---

**Created**: December 2024  
**Technology**: React 18 + TypeScript + React Hook Form
