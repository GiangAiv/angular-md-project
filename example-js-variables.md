# JavaScript Variables Example

This demonstrates the new ```js block functionality for defining variables.

```js
const data = [
  {
    'Id': 'Task 1',
    'Title': 'Task - 29001',
    'Status': 'Open',
    'Summary': 'Analyze customer requirements.',
    'Priority': 'High',
    'Tags': 'Bug, Release Bug',
    'RankId': 1,
    'Assignee': 'Nancy Davloio'
  }
];
const data2 = 1;
const bolVal = true;
```

The above JS block will not be rendered in the output, but the variables are available for use in components.

## Using Variables in Components

### Direct Variable Reference
```jsx
<Kanban
  statusOrder={statusOrder}
  data={data}
/>
```

### String Variable Reference (also works)
```jsx
<Kanban
  statusOrder="$statusOrder"
  data="$data"
/>
```

### Other Variable Types
```jsx
<Value value={data2} />
```

```jsx
<Value value={bolVal} />
```

## Test Fetch Block

```fetch
-api: https://jsonplaceholder.typicode.com/posts
-path: [0].title
-valueAs: postTitle
-loadingAs: isLoading
-defaultValue: 'Loading post...'
```

```jsx
<Value value={postTitle} />
```

```jsx
<Value value={isLoading} />
```

## Features

- ✅ ```js blocks are not rendered in the output
- ✅ ```fetch blocks are not rendered in the output
- ✅ Variables defined with `const`, `let`, or `var` are extracted
- ✅ Data can be fetched from APIs and bound to variables
- ✅ Supports arrays, objects, numbers, booleans, strings
- ✅ JavaScript syntax with single quotes works
- ✅ Variables can be used in JSX expressions like `{variableName}`
- ✅ Variables can also be used with `$` prefix like `"$variableName"`
