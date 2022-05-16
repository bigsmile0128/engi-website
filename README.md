## Getting Started

First, run the development server:

```bash
npm run dev
```

Go to [http://localhost:3000](http://localhost:3000)

## Deployment

```bash
docker build -t engi-website .
docker run -p 3000:3000 engi-website
```

## CI/CD

[CircleCI](https://app.circleci.com/pipelines/github/engi-network/website) is invoked each time you push to GitHub.

Currently there are no filters applied, but eventually we'll want to make it so
changes are only pushed to prod if a tag is applied.

See the file `config.yml` in the directory `.circleci`
