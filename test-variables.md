# Test Variables in Markdown

This is a test file to demonstrate the custom JSON variable syntax in markdown.

## Variable Definitions

```json
count=10
```

```json
label='test'
```

```json
rows=[{a:1, b:2}, {a:3, b:4}]
```

```json
config={theme: 'dark', showHeader: true}
```

```json
isEnabled=true
```

```json
price=29.99
```

```json
deltaValue=+15.5
```

```json
salesData=[
  {month: 'Jan', sales: 1000, profit: 200},
  {month: 'Feb', sales: 1200, profit: 250},
  {month: 'Mar', sales: 1100, profit: 220}
]
```

## Using Variables in Components

The variables defined above can be accessed by components through the dashboard-component-registry service.

### Using Variables with Existing Components

Use the `$` prefix to reference variables in component props:

#### Basic Value Display

```jsx
<Value value="$count" />
```

```jsx
<Value value="$price" />
```

```jsx
<BigValue value="$price" label="Current Price" />
```

#### Delta Components

```jsx
<Delta value="$deltaValue" format="number" />
```

```jsx
<Delta value="$count" format="percent" />
```

#### Working with Array Data

```jsx
<Value data="$salesData" column="sales" row="0" />
```

```jsx
<Value data="$salesData" column="profit" agg="sum" />
```

```jsx
<Value data="$rows" column="a" agg="avg" />
```

#### Complex Components

```jsx
<BigValue value="$price" delta="$deltaValue" label="Revenue" />
```

```jsx
<Table data="$salesData" />
```

### Direct Variable Usage in JSX Expressions

You can also use variables directly without the `$` prefix in JSX expressions:

```jsx
<Card title="My Dashboard" value={count} />
```

```jsx
<Table data={rows} />
```

```jsx
<BigValue value={price} label={label} />
```

## How it Works

1. The markdown parser extracts variables from `json` code blocks using the `variable=value` syntax
2. Variables are parsed using babel/parser for robust JavaScript expression parsing
3. Variables are stored in the dashboard-component-registry service with immutable state management
4. Components can subscribe to variable changes and react accordingly
5. The original markdown files are never modified - variables exist only in the application state

## Supported Value Types

- **Strings**: `name='John Doe'` or `name="John Doe"`
- **Numbers**: `count=42` or `price=19.99`
- **Booleans**: `isActive=true` or `isVisible=false`
- **Arrays**: `items=[1, 2, 3]` or `users=[{id:1, name:'John'}]`
- **Objects**: `config={theme: 'light', size: 'large'}`
- **Null**: `value=null`

## Features

- **Babel/Parser Integration**: Uses babel/parser for robust JavaScript expression parsing
- **Type Safety**: Automatically detects and converts values to appropriate JavaScript types
- **Immutable State**: Variables are managed with immutable state updates
- **Reactive Updates**: Components automatically update when variables change
- **Fallback Parsing**: Falls back to simple parsing if babel parsing fails
