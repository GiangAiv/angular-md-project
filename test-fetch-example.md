# Fetch Block Example

This demonstrates the new ```fetch block functionality for retrieving data from APIs.

```js
const statusOrder = ['Open', 'InProgress', 'Review', 'Close'];
```

```fetch
-api: https://jsonplaceholder.typicode.com/posts
-path: [0]
-valueAs: firstPost
-loadingAs: isLoadingPost
-defaultValue: { title: 'Loading...', body: 'Please wait...' }
```

```fetch
-api: https://jsonplaceholder.typicode.com/users
-path: [0].name
-valueAs: firstUserName
-loadingAs: isLoadingUser
-defaultValue: 'Loading user...'
```

The above fetch blocks will not be rendered in the output, but the data will be fetched and available as variables.

## Using Fetched Data in Components

### Display the fetched post
```jsx
<BigValue 
  value={firstPost.title} 
  label="First Post Title"
/>
```

```jsx
<Value value={firstPost.body} />
```

### Display the fetched user name
```jsx
<Value value={firstUserName} />
```

### Show loading states
```jsx
<Value value={isLoadingPost} />
```

```jsx
<Value value={isLoadingUser} />
```

## Features

- ✅ ```fetch blocks are not rendered in the output
- ✅ Data is fetched from APIs asynchronously
- ✅ Supports lodash-style path extraction (e.g., `[0].name`, `data.items[1].title`)
- ✅ Loading states can be tracked with `loadingAs` parameter
- ✅ Default values are used while loading or on error
- ✅ Fetched data is available as variables for use in components

## Fetch Block Parameters

- `-api`: The API endpoint URL (required)
- `-path`: Lodash-style path to extract specific data from the response (optional)
- `-valueAs`: Variable name to bind the result to (required)
- `-loadingAs`: Variable name to track loading state (optional)
- `-defaultValue`: Default value to use while loading or on error (optional)
