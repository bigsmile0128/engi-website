import { gql } from 'graphql-request';
import { ImageResponse } from 'next/server';
import TechnologyIcon from '~/components/TechnologyIcon';
import { displayAdaInEngi } from '~/utils/currency/conversion';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'About Acme';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: { bitId: string } }) {
  const fontData = await fetch(
    new URL('../../../../../public/fonts/grifterbold.otf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  let job;
  try {
    // use fetch instead of axios because axios is not available in OG image
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: gql`
            query BitDetails($bitId: UInt64!) {
              job(id: $bitId) {
                job {
                  name
                  funding
                  technologies
                }
              }
            }
          `,
          variables: {
            bitId: params.bitId,
          },
        }),
      }
    );

    const json = await response.json();
    job = json.data?.job?.job ?? {};
  } catch (e: any) {
    job = {
      error: e?.message,
    };
  }
  return new ImageResponse(
    (
      <div tw="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-white">
        <div tw="flex items-center border-2 border-white rounded-full pl-12 pr-16 pb-6 pt-8 bg-gray-600">
          <span tw="mr-[12px]">
            <svg height="72" viewBox="0 0 38 33">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.986 27.9681C26.9054 27.9681 31.1307 24.9966 32.965 20.7505H37.288C35.2684 27.2825 29.1814 32.028 21.986 32.028C14.7906 32.028 8.70363 27.2825 6.68403 20.7505H11.007C12.8413 24.9966 17.0666 27.9681 21.986 27.9681ZM21.986 4.05989C17.0666 4.05989 12.8413 7.03142 11.007 11.2775H6.68403C8.70363 4.7455 14.7906 0 21.986 0C29.1814 0 35.2684 4.7455 37.288 11.2775H37.2899C37.9004 13.3956 38 15.0349 38 15.7885C38 16.9903 37.9004 17.8207 37.9004 17.8207H0L3.15769 13.8674H20.5947H29.3665H33.7498C33.7498 13.8674 33.489 12.4052 32.9657 11.2775H32.965C31.1307 7.03142 26.9054 4.05989 21.986 4.05989Z"
                fill="#65FEB7"
              />
            </svg>
          </span>
          <span
            tw="-mb-[10px] text-[126px] font-mono"
            style={{ fontFamily: 'GRIFTER' }}
          >
            {displayAdaInEngi(job?.funding)}
          </span>
        </div>
        <div tw="mt-12 flex flex-wrap text-[88px]">
          {job?.technologies?.map((technology) => (
            <span
              tw="inline-block border-2 border-white rounded-full p-6 mx-4 text-[#65FEB7]"
              key={technology}
            >
              <TechnologyIcon value={technology} key={technology} />
            </span>
          ))}
        </div>
      </div>
    ),
    {
      fonts: [
        {
          name: 'GRIFTER',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );
}
