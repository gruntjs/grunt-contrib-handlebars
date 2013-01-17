# Usage Examples

```js
handlebars: {
  compile: {
    options: {
      namespace: "JST"
    },
    files: {
      "path/to/result.js": "path/to/source.hbs",
      "path/to/another.js": ["path/to/sources/*.hbs", "path/to/more/*.hbs"]
    }
  }
}
```

# AMD Usage Examples

```js
handlebars: {
  compile: {
    options: {
      amd: true
    },
    files: {
      "path/to/result.js": "path/to/sources/*.hbs"
    }
  }
}
```
