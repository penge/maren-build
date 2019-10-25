# my-blog-dummy

Dummy blog is here to test:

1) `/_build/static` is NOT created if
`/static` does NOT exist

2) `/_build/themes/<theme>` is NOT created if
theme has no options (styles, scripts)

3) Theme with no options, or malformed options,
is returned with empty options:

```
{
  styles: [],
  scripts: []
}
```
