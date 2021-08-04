import _ from 'lodash';
import { Button, Popover, Space } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { CommentOutlined } from '@ant-design/icons';

import { useTranslation } from '../../../i18n';

import './LanguageButton.style.scss';

const LanguagesMap: Record<string, string> = { en: 'English', es: 'Español' };

export default (): JSX.Element => {
  const { i18n } = useTranslation();

  const availableLanguages = useMemo(() => _.get(i18n, 'options.allLanguages'), [i18n]);

  const changeLanguage = useCallback(
    (language: string) => {
      i18n.changeLanguage(language);
    },
    [i18n.changeLanguage]
  );

  return (
    <Popover
      content={
        <Space>
          {availableLanguages.map((language) => (
            <Button
              key={language}
              type={i18n.language === language ? 'primary' : 'link'}
              onClick={() => changeLanguage(language)}
            >
              {LanguagesMap[language]}
            </Button>
          ))}
        </Space>
      }
      placement="topRight"
    >
      <Button
        size="large"
        shape="circle"
        icon={<CommentOutlined />}
        style={{ position: 'fixed', bottom: '50px', right: '50px' }}
      />
    </Popover>
  );
};
