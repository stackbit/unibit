# Unibit

Unibit is a superset of existing static site generators, if you build a theme
according to the [Unibit spec](https://docs.stackbit.com/unibit/) then 
[Stackbit](https://www.stackbit.com) will be able to convert (transpile) it into 
a host of target SSGs. 

The following conversions are currently supported by Stackbit:
* **Static Site Generators**: Jekyll, Hugo, Gatsby
* **Headless CMS**: Forestry, Netlify CMS, DatoCMS, Contentful

## Documentation

[Unibit Documentation](https://docs.stackbit.com/unibit)

## Quickstart

```
npm install -g @stackbit/unibit
```

Create a starter site.
```
unibit init
```

Go to the created folder

```
cd unibit-universal
```

Start the local development server. 

```
unibit develop
```

Compile a production build into the `public` folder.

```
unibit build
```
