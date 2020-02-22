import React, { useState, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import en from '../../i18n/en';
import Example from '../Example';
import './App.css';

const initialLocale = localStorage.getItem('locale') || 'en';

const App = () => {
  const [messages, setMessages] = useState({ en, fr: null })
  const [locale, setLocale] = useState(initialLocale);

  useEffect(() => {
    if (!messages[locale]) {
      import(`../../i18n/${locale}`).then((data) => {
        setMessages({ ...messages, [locale]: data });
      });
    }

    localStorage.setItem('locale', locale);
  }, [locale, messages]);

  return (
    <Router>
      <IntlProvider locale={locale} messages={messages[locale] || en}>
        <div className="">
          <header className="">
            in header...
          </header>

          <button onClick={() => setLocale('en')}>EN</button>
          <button onClick={() => setLocale('fr')}>FR</button>

          <Switch>
            <Route path={'/'} component={Example} />
          </Switch>
        </div>
      </IntlProvider>
    </Router>
  );
}

export default App;
