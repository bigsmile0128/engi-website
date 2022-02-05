# Engi UI

The Engi UI component library built by the Engi network

## Storycaps

https://storybook.js.org/addons/storycap/

> capture screenshots for all stories
>
> `$ yarn storycap`

default viewport is 800*600

## Magick

__make sure imagemagick is installed__

compare pngs generated from storycaps with specified design using magick

> compare baseline to newly generated
>
> `$ magick compare -metric PSNR __screenshots__/Example/Button/figma-test.png __screenshots__/Example/Button/Primary.png  -compose Src -highlight-color White -lowlight-color Black difference.png`

> generate diff image w/ black + white
>
> `$ magick compare __screenshots__/Example/Button/figma-test.png __screenshots__/Example/Button/Primary.png  -compose Src -highlight-color White -lowlight-color Black difference.png`
