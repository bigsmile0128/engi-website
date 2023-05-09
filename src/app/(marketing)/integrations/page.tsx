import classNames from 'classnames';
import Header from '~/components/pages/integrations/Header';
import IntegrationsList from '~/components/pages/integrations/IntegrationsList';

export default function Integrations() {
  return (
    <div className={classNames('pt-24 pb-24')}>
      <Header className="max-w-page" />
      <IntegrationsList className="mt-24 desktop:mt-40" />
    </div>
  );
}
