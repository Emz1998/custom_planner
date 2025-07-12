export const monthlyDialogItems = [
  {
    id: 1,
    label: 'Color',
    type: 'color',
    placeholder: '',
    required: false,
  },
  {
    id: 2,
    label: 'Font Size',
    type: 'number',
    placeholder: '',
    required: false,
  },
  {
    id: 3,
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
  },
];

// export const dialogContent = (layout) => {
//   switch (layout) {
//     case 'monthly':
//       return <input type="color" />;
//     case 'number':
//       return <input type="number" />;
//     default:
//       return <input type="text" />;
//   }
// };
