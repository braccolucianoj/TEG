import React from 'react';
import { Button, Col, Input, Row } from 'antd';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';

import APIService from '../services/api';
import { withTranslation } from '../i18n';
import loginText from '../services/i18n/login';
import { useAPICall } from '../components/hooks';
import { withLanguageChange } from '../components/HOC';
import { CustomInputRaw } from '../components/atoms/CustomInput';
import { loginFormSchema, PASSWORD_MIN_LENGTH } from '../services/schemas';

import './styles/login.scss';

const fields = {
  password: 'password',
  emailUsername: 'emailUsername',
};

const inputs = [
  { name: fields.emailUsername, label: loginText.emailUsernameLabel },
  {
    name: fields.password,
    label: loginText.passwordLabel,
    InputComponent: Input.Password,
    errorExtra: {
      number: PASSWORD_MIN_LENGTH,
    },
  },
];

const defaultValues = {
  password: '',
  emailUsername: '',
} as any;

const LoginPage = ({ t }: any): JSX.Element => {
  const router = useRouter();
  const [, loading, errorAPI, execute] = useAPICall(APIService.login, {
    onSuccess: () => router.push('/home'),
  });
  const { control, handleSubmit, errors, formState } = useForm({
    resolver: loginFormSchema,
    reValidateMode: 'onChange',
    defaultValues,
    criteriaMode: 'all',
    mode: 'all',
  });

  return (
    <Row id="loginContainer">
      <Col className="fullHeight" span={6}>
        <form onSubmit={handleSubmit(async (data) => execute({ data }))}>
          {inputs.map(({ name, label, InputComponent, errorExtra, ...rest }) => (
            <Row className="fullWidth">
              <Controller
                key={name}
                name={name}
                control={control}
                render={({ onChange, value, onBlur, ref }) => (
                  <CustomInputRaw
                    {...rest}
                    ref={ref}
                    name={name}
                    value={value}
                    onBlur={onBlur}
                    label={t(label)}
                    onChange={onChange}
                    InputComponent={InputComponent || Input}
                    placeholder={t(loginText.enterText)}
                  />
                )}
              />
            </Row>
          ))}
          <Row>
            <Button loading={loading} disabled={loading || !formState.isValid} type="primary" htmlType="submit">
              {t(loginText.loginButton)}
            </Button>
          </Row>
        </form>
      </Col>
      <Col className="fullHeight" id="logoContainer" span={18} />
    </Row>
  );
};

LoginPage.getInitialProps = async () => ({
  namespacesRequired: ['login'],
});

export default withLanguageChange(withTranslation(['login'])(LoginPage));
