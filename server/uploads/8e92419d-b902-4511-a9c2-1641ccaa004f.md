# Download Data Component

A component for downloading data as CSV files with customizable display options.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data | any[] | [] | The data array to be downloaded as CSV |
| queryID | string | '' | Optional identifier for the downloaded file |
| text | string | 'Download Data' | Text to display on the download button |
| display | 'inline' \| 'block' | 'inline' | Display mode of the button |
| class | string | undefined | Additional CSS classes to apply |

## Features

- CSV file generation
- Customizable button text
- Flexible display modes
- Error handling
- Responsive design
- Print mode support
- Accessibility support

## Usage Examples

### Basic Usage
```jsx
<DownloadData data={{"input":"test1"}} />
```

### Custom Text
```jsx
<DownloadData 
  data={{"input":"test1"}}
  text="Export to CSV"
/>
```

### Block Display
```jsx
<DownloadData 
  data={{"input":"test1"}}
  display="block"
/>
```

### Custom Styling
```jsx
<DownloadData 
  data={{"input":"test1"}}
  class="my-custom-class"
/>
```

## Important Notes

1. The component requires the 'export-to-csv' package
2. Data must be a non-empty array
3. The component handles errors gracefully
4. The button is hidden in print mode
5. The component supports both inline and block display modes
6. Custom classes can be applied for additional styling 