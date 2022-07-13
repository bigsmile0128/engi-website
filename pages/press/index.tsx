import React from 'react';
import classNames from 'classnames';

interface PressPageProps {
  className?: string;
}

export default function PressPage({ className }: PressPageProps) {
  return (
    // TODO: make responsive
    <div
      className={classNames(
        'flex flex-col gap-y-12 max-w-page mt-32',
        className
      )}
    >
      <h1 className="font-grifter text-6xl">Press Page</h1>
      <section className="mb-4">
        <p className="font-grifter text-lg mb-4">
          Section <span className="text-emerald-300">1</span>
        </p>
        <p className="leading-8">
          Cupcake ipsum dolor sit amet. Tootsie roll sesame snaps chocolate bar
          gummies tiramisu ice cream liquorice chocolate cake. Candy sugar plum
          sweet ice cream muffin muffin fruitcake brownie donut. Liquorice candy
          canes ice cream apple pie icing pudding chocolate bar icing. Brownie
          danish cake fruitcake cheesecake lollipop bonbon marshmallow.
          Gingerbread sweet roll lemon drops jelly-o pie pastry dessert
          tiramisu.
        </p>
      </section>
      <section className="mb-4">
        <p className="font-grifter text-lg mb-4">
          Section <span className="text-emerald-300">2</span>
        </p>
        <p className="leading-8">
          Cupcake ipsum dolor sit amet. Tootsie roll sesame snaps chocolate bar
          gummies tiramisu ice cream liquorice chocolate cake. Candy sugar plum
          sweet ice cream muffin muffin fruitcake brownie donut. Liquorice candy
          canes ice cream apple pie icing pudding chocolate bar icing. Brownie
          danish cake fruitcake cheesecake lollipop bonbon marshmallow.
          Gingerbread sweet roll lemon drops jelly-o pie pastry dessert
          tiramisu.
        </p>
      </section>
    </div>
  );
}
