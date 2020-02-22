import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import en from '../../i18n/en';
import Example from '../Example';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState({ en, fr: null })
  const [locale, setLocale] = useState('en');
  
  const changeLocale = (key) => {
    if (!messages[key]) {
      import(`../../i18n/${key}`).then((data) => {
        setMessages({ ...messages, [key]: data });
      });
    }

    setLocale(key);
  };

  return (
    <Router>
      <IntlProvider locale={locale} messages={messages[locale] || en}>
        <div className="">
          <header className="">
            in header...
          </header>

          <button onClick={() => changeLocale('en')}>EN</button>
          <button onClick={() => changeLocale('fr')}>FR</button>

          <Switch>
            <Route path={'/'} component={Example} />
          </Switch>
        </div>
      </IntlProvider>
    </Router>
  );
}

export default App;
