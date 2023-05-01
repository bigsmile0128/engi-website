import React from 'react';
import classNames from 'classnames';
import Header from '~/components/pages/integrations/Header';
import IntegrationsList from '~/components/pages/integrations/IntegrationsList';

type IntegrationsProps = {
  className?: string;
};

export default function Integrations({ className }: IntegrationsProps) {
  return (
    <div className={classNames('pt-24 pb-24', className)}>
      <Header className="max-w-page" />
      <IntegrationsList className="mt-24 desktop:mt-40" />
    </div>
  );
}
