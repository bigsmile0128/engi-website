FROM node:lts-alpine

WORKDIR /code

# Install latest Chromium for Puppeteer
# curl - for running healthcheck cmd in compose
# libvips - for installing sharp properly
RUN apk add --no-cache \
  chromium \
  nss \
  freetype \
  harfbuzz \
  ca-certificates \
  curl \
  vips \
  ttf-freefont

COPY . .

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN npm install -g jest
RUN npm install sharp
RUN npm install

RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
  && mkdir -p /home/pptruser/Downloads /code \
  && chown -R pptruser:pptruser /home/pptruser \
  && chown -R pptruser:pptruser /code

# Run everything after as non-privileged user.
USER pptruser

