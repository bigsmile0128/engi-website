import classNames from 'classnames';
import Image from 'next/image';

import deskImg from 'public/img/press/desk.jpg';
import BlockQuote from '~/components/pages/home/BlockQuote';

export default function PressPage() {
  return (
    <div
      className={classNames(
        'flex flex-col gap-y-12 max-w-page md:!max-w-xl mt-32 mb-32'
      )}
    >
      <h1 className="font-grifter text-6xl">Press Page</h1>
      <section className="mb-8">
        <p className="font-grifter text-lg mb-4">
          <span className="text-green-primary">Globally</span> available
        </p>
        <p className="leading-8">
          Engi provides technology teams with affordable, on-demand,
          contactless, trustless access to global software engineering talent
          and unlocks flexible, equitable, accessible work for coders
          everywhere.
        </p>
      </section>
      <section className="mb-8">
        <p className="font-grifter text-lg mb-4">
          <span className="text-green-primary">Objective</span> verification
        </p>
        <p className="leading-8">
          Engi empowers professional programmers to own their destiny via an
          open-source, open-governed cryptotechnology ecosystem. Programming
          work is expressed entirely in code, creating an economy with
          objective, atomic, and automatic verification of engineering work
          progress and completeness, eliminating bias, reducing cost, and
          unlocking novel dynamics of software construction.
        </p>
      </section>
      <section className="mb-8">
        <Image src={deskImg} alt="Collaboration" />
      </section>
      <section className="mb-8">
        <p className="font-grifter text-lg mb-4">
          <span className="text-green-primary">Investor</span> friendly
        </p>
        <p className="leading-8">
          In addition to supplying software engineering purchasing power and
          network ownership, the $ENGI token also allows anyone to invest and
          speculate directly in the global value of code and coders, decoupled
          from specific businesses and nationalized markets.
        </p>
      </section>
      <section className="mb-8">
        <BlockQuote
          value="We built engi using engi"
          subtitle="We use our own technology and strive to make it better."
        />
      </section>
    </div>
  );
}
