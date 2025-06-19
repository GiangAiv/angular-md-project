# Test Value Component with Variables

This file tests the Value component with shared variables.

## Define Variables

```json
simpleValue=42
```

```json
priceValue=99.99
```

```json
testData=[
  {name: 'Product A', price: 25.50, quantity: 10},
  {name: 'Product B', price: 15.75, quantity: 5},
  {name: 'Product C', price: 30.00, quantity: 8}
]
```

```json
deltaAmount=+12.5
```

## Test Value Component

### Simple Value Display

```jsx
<Value value="$simpleValue" />
```

### Price Value Display

```jsx
<Value value="$priceValue" />
```

### Array Data with Column

```jsx
<Value data="$testData" column="price" row="0" />
```

### Array Data with Aggregation

```jsx
<Value data="$testData" column="quantity" agg="sum" />
```

```jsx
<Value data="$testData" column="price" agg="avg" />
```

### Delta Component

```jsx
<Delta value="$deltaAmount" format="number" />
```

### BigValue Component

```jsx
<BigValue value="$priceValue" label="Current Price" />
```

```jsx
<BigValue value="$simpleValue" delta="$deltaAmount" label="Sales Count" />
```

## Test Mixed Usage

### Direct JSX Variable Usage

```jsx
<Value value={simpleValue} />
```

```jsx
<Delta value={deltaAmount} format="number" />
```

```jsx
<BigValue value={priceValue} label="Direct Variable Usage" />
```

## Expected Results

- Simple value should display: 42
- Price value should display: 99.99
- First product price should display: $25.50 (formatted as currency)
- Total quantity should display: 23
- Average price should display: 23.75
- Delta should display: +12.5
- BigValue components should display formatted values with labels
- All components should automatically update when variables change
- Both `$variable` and direct `{variable}` syntax should work
